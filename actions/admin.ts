"use server";

import { getAdminPanelFeedback, getAdminPanelReport } from "@service/clasor";
import { getMe } from "./auth";

export const getAdminPanelFeedbackAction = async (
  top: number,
  skip: number
) => {
  try {
    const userInfo = await getMe();
    const response = await getAdminPanelFeedback(
      userInfo.access_token,
      top,
      skip
    );
    return response;
  } catch (error) {
    console.log("============ error ==========", error);
  }
};

export const getAdminPanelReportAction = async () => {
  try {
    const userInfo = await getMe();
    const response = await getAdminPanelReport(userInfo.access_token);
    return response;
  } catch (error) {
    console.log("============ error ==========", error);
  }
};
