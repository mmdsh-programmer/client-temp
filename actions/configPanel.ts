"use server";

import { getMe } from "./auth";
import { normalizeError } from "@utils/normalizeActionError";
import { IActionError } from "@interface/app.interface";
import {
  getUserConfigPanel,
  updateMyNotifServices,
  updateUserBlockServices,
  updateUserNotificationServices,
} from "@service/clasor";

export const getUserConfigPanelAction = async (repoId: number, ssoId?: number) => {
  const userInfo = await getMe();
  try {
    const response = await getUserConfigPanel(userInfo.access_token, repoId, ssoId);
    return response;
  } catch (error) {
    return normalizeError(error as IActionError);
  }
};

export const updateUserBlockServicesAction = async (
  repoId: number,
  ssoId: number,
  blockedServices: string[],
) => {
  const userInfo = await getMe();
  try {
    const response = await updateUserBlockServices(
      userInfo.access_token,
      repoId,
      ssoId,
      blockedServices,
    );
    return response;
  } catch (error) {
    return normalizeError(error as IActionError);
  }
};

export const updateUserNotificationServicesAction = async (
  repoId: number,
  ssoId: number,
  notificationServices: string[],
) => {
  const userInfo = await getMe();
  try {
    const response = await updateUserNotificationServices(
      userInfo.access_token,
      repoId,
      ssoId,
      notificationServices,
    );
    return response;
  } catch (error) {
    return normalizeError(error as IActionError);
  }
};

export const updateMyNotifServicesAction = async (
  repoId: number,
  notificationServices?: string[],
) => {
  const userInfo = await getMe();
  try {
    const response = await updateMyNotifServices(
      userInfo.access_token,
      repoId,
      notificationServices,
    );
    return response;
  } catch (error) {
    return normalizeError(error as IActionError);
  }
};
