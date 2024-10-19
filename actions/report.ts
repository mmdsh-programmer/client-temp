"use server";

import { getReport } from "@service/clasor";
import { getMe } from "./auth";
import { normalizeError } from "@utils/normalizeActionError";
import { IActionError } from "@interface/app.interface";

export const getRepositoryReport = async (repoId: number) => {
  const userInfo = await getMe();
  try {
    const response = await getReport(userInfo.access_token, repoId);

    return response;
  } catch (error) {
    return normalizeError(error as IActionError);
  }
};
