"use server"

import { getMe } from "./auth";
import { normalizeError } from "@utils/normalizeActionError";
import { IActionError } from "@interface/app.interface";
import { getUserConfigPanel, updateUserConfigPanel } from "@service/clasor";

export const getUserConfigPanelAction = async (
    repoId: number,
    ssoId: number,
) => {
    const userInfo = await getMe();
    try {
        const response = await getUserConfigPanel(
            userInfo.access_token,
            repoId,
            ssoId,
        );
        return response;
    } catch (error) {
        return normalizeError(error as IActionError);
    }
};

export const updateUserConfigPanelAction = async (
    repoId: number,
    ssoId: number,
    blockedServices?: string[],
    notificationServices?: string[],
    allowedServices?: string[],
) => {
    const userInfo = await getMe();
    try {
        const response = await updateUserConfigPanel(
            userInfo.access_token,
            repoId,
            ssoId,
            blockedServices,
            notificationServices,
            allowedServices,
        );
        return response;
    } catch (error) {
        return normalizeError(error as IActionError);
    }
};