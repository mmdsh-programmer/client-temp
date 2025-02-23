"use server";

import {
  createRepoPublicLink,
  deletePublicLink,
  subscribeRepo,
} from "@service/clasor";

import { IActionError } from "@interface/app.interface";
import { getMe } from "./auth";
import { normalizeError } from "@utils/normalizeActionError";

export const createRepoPublicLinkAction = async (
  repoId: number,
  roleId: number,
  expireTime?: number,
  password?: string
) => {
  const userInfo = await getMe();

  try {
    const response = await createRepoPublicLink(
      userInfo.access_token,
      repoId,
      roleId,
      expireTime,
      password
    );

    return response;
  } catch (error) {
    return normalizeError(error as IActionError);
  }
};

export const deletePublicLinkAction = async (
  repoId: number,
  roleId: number
) => {
  const userInfo = await getMe();

  try {
    const response = await deletePublicLink(
      userInfo.access_token,
      repoId,
      roleId
    );

    return response;
  } catch (error) {
    return normalizeError(error as IActionError);
  }
};

export const subscribeRepoAction = async (hash: string, password?: string) => {
  const userInfo = await getMe();

  try {
    const response = await subscribeRepo(userInfo.access_token, hash, password);

    return response;
  } catch (error) {
    return normalizeError(error as IActionError);
  }
};
