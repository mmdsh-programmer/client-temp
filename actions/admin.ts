"use server";

import { getAdminPanelFeedback, getAdminPanelReport } from "@service/clasor";
import { getMe } from "./auth";

export const getAdminPanelFeedbackAction = async (
  top: number,
  skip: number
) => {
  const userInfo = await getMe();
  const response = await getAdminPanelFeedback(
    userInfo.access_token,
    top,
    skip
  );
  return response;
};

export const getAdminPanelReportAction = async () => {
  const userInfo = await getMe();
  const response = await getAdminPanelReport(userInfo.access_token);
  return response;
};
