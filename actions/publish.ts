"use server";

import { createRepoPublishLink, deletePublishLink } from "@service/clasor";
import { getMe } from "./auth";

export const createRepoPublishLinkAction = async (
  repoId: number,
  expireTime?: number,
  password?: string
) => {
  const userInfo = await getMe();

  const response = await createRepoPublishLink(
    userInfo.access_token,
    repoId,
    expireTime,
    password
  );

  return response;
};

export const deletePublishLinkAction = async (repoId: number) => {
  const userInfo = await getMe();

  const response = await deletePublishLink(userInfo.access_token, repoId);

  return response;
};
