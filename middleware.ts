import { NextRequest, NextResponse } from "next/server";
import { generateKey, toEnglishDigit } from "./utils";

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
  "/sampleError",
  "/signin",
  "/subscribe",
  "/feeds"
];

function convertDocsUrlToPublishUrl(url: string): string | null {
  const decodedUrl = decodeURIComponent(url);
  const isPrivate = decodedUrl.startsWith("/private/");
  
  // Match pattern that accepts both cases (with and without category)
  const pagePatternWithCategory = /^\/(?:private\/)?page\/([^/]+)\/([۰-۹\d]+)\/([^/]+)\/([۰-۹\d]+)\/([^/]+)\/([۰-۹\d]+)\/([^/]+)\/([۰-۹\d]+)$/;
  const pagePatternWithoutCategory = /^\/(?:private\/)?page\/([^/]+)\/([۰-۹\d]+)\/([^/]+)\/([۰-۹\d]+)\/([^/]+)\/([۰-۹\d]+)$/;
  
  const matchWithCategory = decodedUrl.match(pagePatternWithCategory);
  const matchWithoutCategory = decodedUrl.match(pagePatternWithoutCategory);

  if (!matchWithCategory && !matchWithoutCategory) return null;

  let segments: string[];

  if (matchWithCategory) {
    const [, repoName, repoId, categoryName, categoryId, documentName, documentId, , versionId] = matchWithCategory;
    segments = [
      "publish",
      toEnglishDigit(repoId),
      encodeURIComponent(repoName),
      ...(isPrivate ? ["private"] : []),
      toEnglishDigit(categoryId),
      encodeURIComponent(categoryName),
      toEnglishDigit(documentId),
      encodeURIComponent(documentName),
      `v-${toEnglishDigit(versionId)}`,
    ];
  } else {
    const [, repoName, repoId, documentName, documentId, , versionId] = matchWithoutCategory!;
    segments = [
      "publish",
      toEnglishDigit(repoId),
      encodeURIComponent(repoName),
      ...(isPrivate ? ["private"] : []),
      toEnglishDigit(documentId),
      encodeURIComponent(documentName),
      `v-${toEnglishDigit(versionId)}`,
    ];
  }

  return `/${segments.join("/")}`;
}

export async function middleware(request: NextRequest) {
  const headersList = await headers();
  const domain = headersList.get("host");
 try {
  // Check the origin from the request
  const origin = request.headers.get("origin") ?? "";
  const isAllowedOrigin = allowedOrigins.includes(origin);

  // Handle pref requests
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

  const newUrl = convertDocsUrlToPublishUrl(pathname);
  if (newUrl) {
    url.pathname = newUrl;
    return NextResponse.redirect(url);
  }


  if (domain) {
    const isInPages = pages.find((page) => {
      return url.pathname.startsWith(page);
    });
    if (isInPages) {
      const domainKey = generateKey(domain);
      url.pathname = `/${domainKey}${url.pathname}`;
      return NextResponse.rewrite(url);
    }
    if (url.pathname === "/") {
      const domainKey = generateKey(domain);
      // const data = await getCustomPostByDomain(domain);
      // if (data.enablePublishPage) {
      //   url.pathname = `/${domainKey}/publish`;
      //   return NextResponse.rewrite(url);
      // }
      url.pathname = `/${domainKey}/signin`;
      return NextResponse.rewrite(url);
    }
  }
  return response;
 } catch (error) {
  console.log(error);
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
  ],
};
