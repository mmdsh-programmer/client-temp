"use server";

import { createRepoTypes, deleteRepoType, getRepoTypes } from "@service/clasor";
import { getMe } from "./auth";
import { normalizeError } from "@utils/normalizeActionError";
import { IActionError } from "@interface/app.interface";

export const getRepoTypesAction = async () => {
  const userInfo = await getMe();
  try {
    const response = await getRepoTypes(userInfo.access_token);
    return response;
  } catch (error) {
    return normalizeError(error as IActionError);
  }
};

export const createRepoTypesAction = async (name: string) => {
  const userInfo = await getMe();
  try {
    const response = await createRepoTypes(
      userInfo.access_token,
      name,
      userInfo.username
    );
    return response;
  } catch (error) {
    return normalizeError(error as IActionError);
  }
};

export const deleteRepoTypeAction = async (id: number) => {
  const userInfo = await getMe();
  try {
    const response = await deleteRepoType(
      userInfo.access_token,
      id,
    );
    return response;
  } catch (error) {
    return normalizeError(error as IActionError);
  }
};
