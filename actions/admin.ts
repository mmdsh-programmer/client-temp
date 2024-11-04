"use server";

import { getAdminPanelFeedback, getAdminPanelReport } from "@service/clasor";
import { getMe } from "./auth";
import { IActionError } from "@interface/app.interface";
import { normalizeError } from "@utils/normalizeActionError";

export const getAdminPanelFeedbackAction = async (
  top: number,
  skip: number
) => {
  const userInfo = await getMe();
  try {
    const response = await getAdminPanelFeedback(
      userInfo.access_token,
      top,
      skip
    );
    return response;
  } catch (error) {
    return normalizeError(error as IActionError);
  }
};

export const getAdminPanelReportAction = async () => {
  const userInfo = await getMe();
  try {
    const response = await getAdminPanelReport(userInfo.access_token);
    return response;
  } catch (error) {
    return normalizeError(error as IActionError);
  }
};
