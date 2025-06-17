import { NextRequest, NextResponse } from "next/server";
import { generateKey, removeSpecialCharacters, toEnglishDigit, toPersianDigit } from "./utils";
import { NextURL } from "next/dist/server/web/next-url";
import { headers } from "next/headers";

// import { getCustomPostByDomain } from "@service/social";


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
  "/privateDoc"
];

function parseUrlSegments(pathname: string): string[] {
  return pathname.split("/").map(slug => {
    return removeSpecialCharacters(decodeURIComponent(slug));
  });
}

function extractCategoryIds(slugs: string[], startIndex: number, endIndex: number): string[] {
  const ids: string[] = [];
  for (let i = startIndex; i < endIndex; i += 2) {
    const catId = Number(toEnglishDigit(slugs[i]));
    if (!Number.isNaN(catId)) {
      ids.push(toPersianDigit(catId));
    }
  }
  return ids;
}

function convertDocsUrlToPublishUrl(url: NextURL): NextURL | null {
  const { pathname } = url;
  const isPrivate = pathname.startsWith("/private/page");
  
  if (!pathname.startsWith("/page") && !isPrivate) {
    return null;
  }

  const slugs = parseUrlSegments(pathname);
  const repoIdIndex = isPrivate ? 4 : 3;
  const repoId = slugs[repoIdIndex];
  const repoName = slugs[repoIdIndex - 1];
  
  // Handle repository-only URL (no document)
  if (repoId && slugs.length === 4) {
    const newUrl = new NextURL(url);
    newUrl.pathname = `/publish/${repoName}/${repoId}`;
    return newUrl;
  }

  // Handle document URLs
  if (slugs.length < 6) {
    return null;
  }

  const documentId = slugs[slugs.length - 3];
  const documentName = slugs[slugs.length - 4];
  const versionId = slugs[slugs.length - 1];
  const versionName = slugs[slugs.length - 2];

  if (!documentId || !documentName || !versionId) {
    return null;
  }

  const newUrl = new NextURL(url);
  
  // Extract category IDs
  const categoryStartIndex = isPrivate ? 6 : 5;
  const categoryEndIndex = slugs.length - 4;
  const categoryIds = extractCategoryIds(slugs, categoryStartIndex, categoryEndIndex);
  
  if (categoryIds.length > 0) {
    newUrl.searchParams.set("ids", categoryIds.join("-"));
  }

  const basePath = isPrivate ? "/private" : "/publish";
  newUrl.pathname = `${basePath}/${repoName}/${repoId}/${documentName}/${documentId}/${versionName}/v-${versionId}`;
  
  return newUrl;
}

function convertOldPublishUrl(url: NextURL): NextURL | null {
  const { pathname } = url;

  if (!pathname.startsWith("/publish")) {
    return null;
  }

  const slugs = parseUrlSegments(pathname);
  
  if (slugs.length < 4) {
    return null;
  }

  const repoId = slugs[2];
  const repoName = slugs[3];

  // Validate that repoId is numeric and repoName is not numeric
  const repoIdNum = Number(toEnglishDigit(repoId));
  const repoNameNum = Number(toEnglishDigit(repoName));
  
  if (Number.isNaN(repoIdNum) || !Number.isNaN(repoNameNum)) {
    return null;
  }

  const newUrl = new NextURL(url);
  
  // Handle repository-only URL
  if (slugs.length === 4) {
    newUrl.pathname = toPersianDigit(`/publish/${repoName}/${repoId}`);
    return newUrl;
  }

  // Handle document URLs
  const lastSlug = toEnglishDigit(slugs[slugs.length - 1]);
  const hasVersion = lastSlug.startsWith("v-") && !Number.isNaN(Number(lastSlug.substring(2)));
  
  const documentOffset = hasVersion ? 3 : 1;
  const nameOffset = hasVersion ? 4 : 2;
  
  const documentId = slugs[slugs.length - documentOffset];
  const documentName = slugs[slugs.length - nameOffset];

  if (!documentId || !documentName) {
    return null;
  }

  // Extract category IDs
  const categoryStartIndex = 5;
  const categoryEndIndex = slugs.length - nameOffset;
  const categoryIds = extractCategoryIds(slugs, categoryStartIndex, categoryEndIndex);
  
  if (categoryIds.length > 0) {
    newUrl.searchParams.set("ids", categoryIds.join("-"));
  }

  if (!hasVersion) {
    newUrl.pathname = toPersianDigit(`/publish/${repoName}/${repoId}/${documentName}/${documentId}`);
    return newUrl;
  }

  const versionId = lastSlug.substring(2); // Remove "v-" prefix
  const versionName = slugs[slugs.length - 2];

  if (!versionId || !versionName) {
    return null;
  }

  newUrl.pathname = toPersianDigit(`/publish/${repoName}/${repoId}/${documentName}/${documentId}/${versionName}/v-${versionId}`);
  return newUrl;
}

export async function middleware(request: NextRequest) {
  try {
    const headersList = await headers();
    const domain = headersList.get("host");
    
    // Handle CORS
    const origin = request.headers.get("origin") ?? "";
    const isAllowedOrigin = allowedOrigins.includes(origin);
    const isPreflight = request.method === "OPTIONS";

    if (isPreflight) {
      const preflightHeaders = {
        ...(isAllowedOrigin && { "Access-Control-Allow-Origin": origin }),
        ...corsOptions,
      };
      return NextResponse.json({}, { headers: preflightHeaders });
    }

    const response = NextResponse.next();

    if (isAllowedOrigin) {
      response.headers.set("Access-Control-Allow-Origin", origin);
    }

    Object.entries(corsOptions).forEach(([key, value]) => {
      response.headers.set(key, value);
    });

    const url = request.nextUrl;
    const { pathname } = url;

    // Handle docs URL conversion
    const newDocsUrl = convertDocsUrlToPublishUrl(url);
    if (newDocsUrl) {
      return NextResponse.redirect(newDocsUrl);
    }

    // Handle old publish URL conversion (skip if already on /publish root)
    if (pathname !== "/publish") {
      const newPublishUrl = convertOldPublishUrl(url);
      if (newPublishUrl) {
        return NextResponse.redirect(newPublishUrl);
      }
    }

    // Handle domain-based routing
    if (domain) {
      const isInPages = pages.some(page => {
        return pathname.startsWith(page);
      });
      
      if (isInPages) {
        const domainKey = generateKey(domain);
        url.pathname = `/${domainKey}${pathname}`;
        return NextResponse.rewrite(url);
      }
      
      if (pathname === "/") {
        const domainKey = generateKey(domain);
        url.pathname = `/${domainKey}`;
        return NextResponse.rewrite(url);
      }
    }

    return response;
  } catch (error) {
    console.error("Middleware error:", error);
    return NextResponse.next();
  }
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
    "/privateDoc/:path*"
  ],
};
