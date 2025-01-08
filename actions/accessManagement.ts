import { getMe } from "./auth";
import { normalizeError } from "@utils/normalizeActionError";
import { IActionError } from "@interface/app.interface";
import {
  addAccessToResource,
  deleteAccessOfResource,
  getUsersOfResource,
} from "@service/clasor";

export const getUsersOfResourceAction = async (
  resourceId: number,
  offset: number,
  size: number
) => {
  const userInfo = await getMe();
  try {
    const response = await getUsersOfResource(
      userInfo.access_token,
      resourceId,
      offset,
      size
    );
    return response;
  } catch (error) {
    return normalizeError(error as IActionError);
  }
};

export const addAccessToResourceAction = async (
  resourceId: number,
  accessNames: string[],
  username: string,
  cascadeToChildren: boolean
) => {
  const userInfo = await getMe();
  try {
    const response = await addAccessToResource(
      userInfo.access_token,
      resourceId,
      accessNames,
      username,
      cascadeToChildren
    );
    return response;
  } catch (error) {
    return normalizeError(error as IActionError);
  }
};

export const deleteAccessOfResourceAction = async (
  resourceId: number,
  accessNames: string[],
  username: string,
  validate: boolean
) => {
  const userInfo = await getMe();
  try {
    const response = await deleteAccessOfResource(
      userInfo.access_token,
      resourceId,
      accessNames,
      username,
      validate
    );
    return response;
  } catch (error) {
    return normalizeError(error as IActionError);
  }
};
