"use server";

import { getReport } from "@service/clasor";
import { getMe } from "./auth";

export const getRepositoryReport = async (repoId: number) => {
  const userInfo = await getMe();
  const response = await getReport(userInfo.access_token, repoId);

  return response;
};
