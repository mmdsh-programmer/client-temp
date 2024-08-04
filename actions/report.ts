"use server";

import { getReport } from "@service/clasor";
import { getMe } from "./auth";

export const getRepositoryReport = async (
  repoId: number,
) => {
  const userInfo = await getMe();
  try {
    const response = await getReport(
      userInfo.access_token,
      repoId,
    );

    return response;
  } catch (error) {
    console.log("============ error ==========", error);
  }
};
