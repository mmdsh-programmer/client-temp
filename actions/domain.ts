"use server";

import { getDomainPublishRepoList } from "@service/clasor";
import { getMe } from "./auth";
import { headers } from "next/headers";

export const getDomainPublishRepositoriesAction = async (
  offset: number,
  size: number
) => {
  const userInfo = await getMe();

  const domain = headers().get("host");
  if (!domain) {
    throw new Error("Domain is not found");
  }
  const response = await getDomainPublishRepoList(
    userInfo.access_token,
    domain,
    offset,
    size
  );
  return response;
};
