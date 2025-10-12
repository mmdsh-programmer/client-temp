import { NextRequest, NextResponse } from "next/server";
import { NextURL } from "next/dist/server/web/next-url";
import { headers } from "next/headers";
import { generateKey, removeSpecialCharacters, toEnglishDigit, toPersianDigit } from "./utils";
import { requestContext } from "lib/requestContext";
import { logErrorResponse, logRequest, logResponse, logRewrite } from "lib/logging";

const ipRequestLog = new Map();
const RATE_LIMIT_WINDOW = 60 * 1000;
const RATE_LIMIT_MAX = 100; // maximum allowed requests per IP per minute

const allowedOrigins = [process.env.NEXT_PUBLIC_BACKEND_URL];
const corsOptions = {
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};
const pages = [
  "/cache",
  "/admin",
  "/panel-admin-clasor",
  "/publish",
  "/private",
  "/sampleError",
  "/signin",
  "/subscribe",
  "/feeds",
  "/share",
  "/privateDoc",
];

function addSecurityHeaders(response: NextResponse) {
  response.headers.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains; preload");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set(
    "Permissions-Policy",
    "geolocation=(), camera=(), microphone=(), payment=(), usb=(), magnetometer=(), gyroscope=(), accelerometer=()",
  );

  const FRAME_ENV_KEYS = [
    "NEXT_PUBLIC_CLASSIC_EDITOR",
    "NEXT_PUBLIC_WORD_EDITOR",
    "NEXT_PUBLIC_FLOWCHART_EDITOR",
    "NEXT_PUBLIC_EXCEL_EDITOR",
    "NEXT_PUBLIC_LATEX_EDITOR",
    "NEXT_PUBLIC_BOARD_URL",
  ];
  const dynamicFrames = FRAME_ENV_KEYS.map((key) => {
    return process.env[key];
  }).filter(Boolean);
  const frameSrcList = ["'self'", ...dynamicFrames].join(" ");

  const csp = [
    "default-src 'self'",
    "img-src 'self' data: https: blob: file:",
    "media-src 'self' data: https: blob: file:",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://podlytics.sandpod.ir",
    "style-src 'self' 'unsafe-inline'",
    "font-src * data: blob:",
    "connect-src 'self' https: wss: https://podlytics.sandpod.ir",
    "frame-ancestors 'none'",
    `frame-src ${frameSrcList} data: blob:`,
    "base-uri 'self'",
    "form-action 'self'",
    "object-src 'none'",
    "upgrade-insecure-requests",
  ].join("; ");
  response.headers.set("Content-Security-Policy", csp);
  response.headers.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains; preload");

  if (process.env.NODE_ENV === "production") {
    response.headers.delete("X-Middleware-Rewrite");
    response.headers.delete("X-Action-Revalidated");
  }
  return response;
}

function parseUrlSegments(pathname: string) {
  return pathname.split("/").map((slug) => {
    return removeSpecialCharacters(decodeURIComponent(slug));
  });
}
function extractCategoryIds(slugs: string[], startIndex: number, endIndex: number) {
  const ids: string[] = [];
  for (let i = startIndex; i < endIndex; i += 2) {
    const catId = Number(toEnglishDigit(slugs[i]));
    if (!Number.isNaN(catId)) ids.push(toPersianDigit(catId));
  }
  return ids;
}

function convertDocsUrlToPublishUrl(url: NextURL): NextURL | null {
  const { pathname } = url;
  const isPrivate = pathname.startsWith("/private/page");
  if (!pathname.startsWith("/page") && !isPrivate) return null;

  const slugs = parseUrlSegments(pathname);
  const repoIdIndex = isPrivate ? 4 : 3;
  const repoId = slugs[repoIdIndex];
  const repoName = slugs[repoIdIndex - 1];

  if (repoId && slugs.length === 4) {
    const newUrl = new NextURL(url);
    newUrl.pathname = `/publish/${repoName}/${repoId}`;
    return newUrl;
  }
  if (slugs.length < 6) return null;

  const documentId = slugs[slugs.length - 3];
  const documentName = slugs[slugs.length - 4];
  const versionId = slugs[slugs.length - 1];
  const versionName = slugs[slugs.length - 2];

  const newUrl = new NextURL(url);
  const categoryStartIndex = isPrivate ? 6 : 5;
  const categoryEndIndex = slugs.length - 4;
  const categoryIds = extractCategoryIds(slugs, categoryStartIndex, categoryEndIndex);
  if (categoryIds.length > 0) newUrl.searchParams.set("ids", categoryIds.join("-"));

  const basePath = isPrivate ? "/private" : "/publish";
  newUrl.pathname = `${basePath}/${repoName}/${repoId}/${documentName}/${documentId}/${versionName}/v-${versionId}`;
  return newUrl;
}

function convertOldPublishUrl(url: NextURL): NextURL | null {
  const { pathname } = url;
  if (!pathname.startsWith("/publish")) return null;

  const slugs = parseUrlSegments(pathname);
  if (slugs.length < 4) return null;

  const repoId = slugs[2];
  const repoName = slugs[3];
  if (
    Number.isNaN(Number(toEnglishDigit(repoId))) ||
    !Number.isNaN(Number(toEnglishDigit(repoName)))
  )
    return null;

  const newUrl = new NextURL(url);
  if (slugs.length === 4) {
    newUrl.pathname = toPersianDigit(`/publish/${repoName}/${repoId}`);
    return newUrl;
  }

  const lastSlug = toEnglishDigit(slugs[slugs.length - 1]);
  const hasVersion = lastSlug.startsWith("v-") && !Number.isNaN(Number(lastSlug.substring(2)));
  const documentOffset = hasVersion ? 3 : 1;
  const nameOffset = hasVersion ? 4 : 2;

  const documentId = slugs[slugs.length - documentOffset];
  const documentName = slugs[slugs.length - nameOffset];

  const categoryStartIndex = 5;
  const categoryEndIndex = slugs.length - nameOffset;
  const categoryIds = extractCategoryIds(slugs, categoryStartIndex, categoryEndIndex);
  if (categoryIds.length > 0) newUrl.searchParams.set("ids", categoryIds.join("-"));

  if (!hasVersion) {
    newUrl.pathname = toPersianDigit(
      `/publish/${repoName}/${repoId}/${documentName}/${documentId}`,
    );
    return newUrl;
  }

  const versionId = lastSlug.substring(2);
  const versionName = slugs[slugs.length - 2];
  newUrl.pathname = toPersianDigit(
    `/publish/${repoName}/${repoId}/${documentName}/${documentId}/${versionName}/v-${versionId}`,
  );
  return newUrl;
}

// -------- Middleware اصلی --------
export async function middleware(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for") || "unknown";
  const now = Date.now();
  let reqLog = ipRequestLog.get(ip) || [];
  reqLog = reqLog.filter((t: number) => {
    return now - t < RATE_LIMIT_WINDOW;
  });
  reqLog.push(now);
  if (reqLog.length > RATE_LIMIT_MAX) {
    return new Response("Too many requests", { status: 429 });
  }
  ipRequestLog.set(ip, reqLog);

  const startTime = Date.now();
  const arn = crypto.randomUUID();
  const referenceNumber = request.headers.get("x-reference-number") || crypto.randomUUID();
  const bodyClone = await request
    .clone()
    .json()
    .catch(() => {
      return null;
    });
  const reqHeaders = new Headers(request.headers);
  reqHeaders.set("x-arn", arn);
  reqHeaders.set("x-reference-number", referenceNumber);

  return requestContext.run({ arn, referenceNumber }, async () => {
    const response = NextResponse.next({ request: { headers: reqHeaders } });

    try {
      const url = request.nextUrl;
      const path = url.pathname;
      const host = (await headers()).get("host");

      // -------- Logging Async --------
      if (path.startsWith("/api")) {
        response.headers.set("x-reference-number", referenceNumber);
        response.headers.set("x-trace-id", arn);
        logRequest(request, startTime, arn, referenceNumber, bodyClone).catch(console.error);
        logResponse(request, response, startTime, arn, referenceNumber).catch(console.error);
      }

      // -------- CORS -----------
      const origin = request.headers.get("origin") ?? "";
      const isAllowedOrigin = allowedOrigins.includes(origin);
      if (request.method === "OPTIONS") {
        const preflightHeaders = {
          ...(isAllowedOrigin && { "Access-Control-Allow-Origin": origin }),
          ...corsOptions,
          "Strict-Transport-Security": "max-age=31536000; includeSubDomains; preload",
          "X-Content-Type-Options": "nosniff",
          "X-Frame-Options": "DENY",
          "Referrer-Policy": "strict-origin-when-cross-origin",
          "Permissions-Policy":
            "geolocation=(), camera=(), microphone=(), payment=(), usb=(), magnetometer=(), gyroscope=(), accelerometer=(), ambient-light-sensor=()",
          "Content-Security-Policy":
            "default-src 'self'; img-src 'self' data: https: blob: file:; media-src 'self' data: https: blob: file:; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; font-src 'self' data:; connect-src 'self' https: wss:; frame-ancestors 'none'; base-uri 'self'; form-action 'self'; object-src 'none'; upgrade-insecure-requests",
        };
        return NextResponse.json({}, { headers: preflightHeaders });
      }
      if (isAllowedOrigin) response.headers.set("Access-Control-Allow-Origin", origin);
      Object.entries(corsOptions).forEach(([key, value]) => {
        return response.headers.set(key, value);
      });

      // -------- Blog Rewrite --------
      if (path.startsWith("/blog")) {
        try {
          if (process.env.BLOG_BOX_URL && process.env.BLOG_BOX_ID) {
            const dest = `${process.env.BLOG_BOX_URL}/blog/${process.env.BLOG_BOX_ID}${path.replace("/blog", "")}`;
            console.log(`[INFO] Attempting to rewrite to: ${dest}`);
            await logRewrite({
              from: url.pathname,
              to: dest,
              host,
              referenceNumber,
              arn,
              success: true,
            });
            return addSecurityHeaders(NextResponse.rewrite(dest));
          }
          await logRewrite({
            from: url.pathname,
            host,
            referenceNumber,
            arn,
            success: false,
            error: "BLOG_BOX_URL or BLOG_BOX_ID not set",
          });
        } catch (err) {
          await logRewrite({
            from: url.pathname,
            host,
            referenceNumber,
            arn,
            success: false,
            error: err,
          });
        }
      }

      // -------- Docs Rewrite --------
      const newDocsUrl = convertDocsUrlToPublishUrl(url);
      if (newDocsUrl) {
        console.info("🔀 Docs → Publish Rewrite");
        await logRewrite({
          from: url.pathname,
          to: newDocsUrl.pathname,
          search: newDocsUrl.search,
          host,
          referenceNumber,
          arn,
          success: true,
        });
        return addSecurityHeaders(NextResponse.redirect(newDocsUrl));
      }

      // -------- Old Publish Rewrite --------
      if (path !== "/publish") {
        const newPublishUrl = convertOldPublishUrl(url);
        if (newPublishUrl) {
          console.info("🔀 Old Publish → New Publish Rewrite");
          await logRewrite({
            from: url.pathname,
            to: newPublishUrl.pathname,
            search: newPublishUrl.search,
            host,
            referenceNumber,
            arn,
            success: true,
          });
          return addSecurityHeaders(NextResponse.redirect(newPublishUrl));
        }
      }

      // -------- Domain Rewrite --------
      if (host) {
        const isInPages = pages.some((page) => {
          return path.startsWith(page);
        });
        if (isInPages) {
          const domainKey = generateKey(host);
          const dest = `/${domainKey}${path}`;
          await logRewrite({
            from: url.pathname,
            to: dest,
            host,
            referenceNumber,
            arn,
            success: true,
          });
          url.pathname = dest;
          return addSecurityHeaders(NextResponse.rewrite(url));
        }
        if (path === "/") {
          const domainKey = generateKey(host);
          const dest = `/${domainKey}`;
          await logRewrite({
            from: "/",
            to: dest,
            host,
            referenceNumber,
            arn,
            success: true,
          });
          url.pathname = dest;
          return addSecurityHeaders(NextResponse.rewrite(url));
        }
      }
    } catch (error) {
      logErrorResponse(request, startTime, arn, error, referenceNumber).catch(console.error);
      if (request.nextUrl.pathname.startsWith("/api")) {
        const errorResponse = NextResponse.json(
          { error: "Internal Server Error", referenceNumber, traceId: arn },
          { status: 500 },
        );
        errorResponse.headers.set("x-reference-number", referenceNumber);
        errorResponse.headers.set("x-trace-id", arn);
        return errorResponse;
      }
    }

    return addSecurityHeaders(response);
  });
}

export const config = {
  matcher: [
    "/",
    "/cache/:path*",
    "/admin/:path*",
    "/panel-admin-clasor/:path*",
    "/publish/:path*",
    "/sampleError/:path*",
    "/signin/:path*",
    "/subscribe/:path*",
    "/api/:path*",
    "/page/:path*",
    "/private/:path*",
    "/feeds/:path*",
    "/share/:path*",
    "/privateDoc/:path*",
  ],
  runtime: "nodejs",
};
