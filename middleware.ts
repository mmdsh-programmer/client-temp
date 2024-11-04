import { NextRequest, NextResponse } from "next/server";

import { generateKey } from "./utils";
import { headers } from "next/headers";

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
];
export async function middleware(request: NextRequest) {
  // Check the origin from the request
  const origin = request.headers.get("origin") ?? "";
  const isAllowedOrigin = allowedOrigins.includes(origin);

  // Handle preflighted requests
  const isPreflight = request.method === "OPTIONS";

  if (isPreflight) {
    const preflightHeaders = {
      ...(isAllowedOrigin && { "Access-Control-Allow-Origin": origin }),
      ...corsOptions,
    };
    return NextResponse.json({}, { headers: preflightHeaders });
  }

  // Handle simple requests
  const response = NextResponse.next();

  if (isAllowedOrigin) {
    response.headers.set("Access-Control-Allow-Origin", origin);
  }

  Object.entries(corsOptions).forEach(([key, value]) => {
    response.headers.set(key, value);
  });

  const url = request.nextUrl;
  const headersList = await headers();
  const domain = headersList.get("host");
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
      url.pathname = `/${domainKey}${url.pathname}`;
      return NextResponse.rewrite(url);
    }
  }
  return response;
}

export const config = {
  matcher: [
    "/cache/:path*",
    "/admin/:path*",
    "/panel-admin-clasor/:path*",
    "/publish/:path*",
    "/sampleError/:path*",
    "/signin/:path*",
    "/subscribe/:path*",
    "/api/:path*"
  ],
};
