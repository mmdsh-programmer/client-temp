"use server";

import { headers } from "next/headers";

export const getDomainHost = async () => {
  const isDev = process.env.NODE_ENV === "development";
  const envDomain = process.env.DOMAIN;

  let domain: string | null = null;

  const headersList = await headers();

  if (isDev) {
    domain = envDomain || null;
  } else {
    domain = headersList.get("host");
  }

  return domain;
};
