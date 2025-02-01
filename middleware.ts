import { NextRequest, NextResponse } from "next/server";
import { generateKey, toEnglishDigit, toPersianDigit } from "./utils";

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
  "/feeds"
];

function convertDocsUrlToPublishUrl(url: NextURL) {
  const { pathname } = url;
  const isPrivate = pathname.startsWith("/private/page");
  if(!pathname.startsWith("/page") && !isPrivate){
     return;
  }

  const newUrl = new NextURL(url);

  const slugs = pathname.split("/").map(slug => {
    return (decodeURIComponent(slug)).replace(/\s/g, "-");
  });

  const repoIdIndex = pathname.startsWith("/private/page") ? 4 : 3;

  const repoId = slugs[repoIdIndex];
  const repoName = slugs[repoIdIndex - 1];
  
  if(repoId && slugs.length === 4){
    newUrl.pathname = `/publish/${repoName}/${repoId}`;
    return newUrl;
  }
  const documentId = slugs[slugs.length - 3];
  const documentName = slugs[slugs.length - 4];

  const ids: string[] = [];
  for(let i = isPrivate ? 6 : 5; i < slugs.length - 4; i += 2){
    const catId = Number(toEnglishDigit(slugs[i]));
    if(!Number.isNaN(catId)){
      ids.push(toPersianDigit(catId));
    }
  }

  if(ids.length){
    newUrl.searchParams.set("ids", ids.join("-"));
  }


  const versionId = slugs[slugs.length - 1];
  const versionName = slugs[slugs.length - 2];

  if(documentId && documentName && versionId){
    newUrl.pathname = `/${isPrivate ? "private" : "publish"}/${repoName}/${repoId}/${documentName}/${documentId}/${versionName}/v-${versionId}`;
    return newUrl;
  }
  return null;
}

function convertOldPublishUrl(url: NextURL) {
  const { pathname } = url;

  if(!pathname.startsWith("/publish")){
    return;
 }

  const slugs = pathname.split("/").map(slug => {
    return (decodeURIComponent(slug)).replace(/\s/g, "-");
  });
 
  const repoId = slugs[2];
  const repoName = slugs[3];

  if(Number.isNaN(Number(toEnglishDigit(repoId)))){
    return;
  }


  const newUrl = new NextURL(url);
  if(repoId && slugs.length === 4){
    newUrl.pathname = toPersianDigit(`/publish/${repoName}/${repoId}`);
    return newUrl;
  }

  const lastSlug = toEnglishDigit(slugs[slugs.length - 1]);
  const hasVersion = !Number.isNaN(lastSlug) && lastSlug.startsWith("v-");

  
  
  const documentId = slugs[slugs.length - (hasVersion ? 3 : 1)];
  const documentName = slugs[slugs.length - (hasVersion ? 4 : 2)];

  const ids: string[] = [];
  for(let i = 5; i < slugs.length - (hasVersion ? 4 : 2); i += 2){
    const catId = Number(toEnglishDigit(slugs[i]));
    if(!Number.isNaN(catId)){
      ids.push(toPersianDigit(catId));
    }
  }

  if(ids.length){
    newUrl.searchParams.set("ids", ids.join("-"));
  }




  if(documentId && documentName && !hasVersion){
    newUrl.pathname = toPersianDigit(`/publish/${repoName}/${repoId}/${documentName}/${documentId}`);
    return newUrl;
  }

  const versionId = slugs[slugs.length - 1].replace("v-", "");
  const versionName = slugs[slugs.length - 2];

  if(documentId && documentName && versionId && versionName){
    newUrl.pathname = toPersianDigit(`/publish/${repoName}/${repoId}/${documentName}/${documentId}/${versionName}/v-${versionId}`);
    return newUrl;
  }

  return null;
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

  const newUrl = convertDocsUrlToPublishUrl(url);
  if (newUrl) {
    return NextResponse.redirect(newUrl);
  }

  const newPublishUrl = convertOldPublishUrl(url);
  if (newPublishUrl) {
    return NextResponse.redirect(newPublishUrl);
  }

  if (domain) {
    const isInPages = pages.find((page) => {
      return pathname.startsWith(page);
    });
    if (isInPages) {
      const domainKey = generateKey(domain);
      url.pathname = `/${domainKey}${pathname}`;
      return NextResponse.rewrite(url);
    }
    if (pathname === "/") {
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
