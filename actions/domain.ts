"use server";

import { getDomainPublishRepoList } from "@service/clasor";
import { headers } from "next/dist/client/components/headers";
import { getMe } from "./auth";

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
    "http://zahraesp.ir",
    offset,
    size
  );
  return response;
};
