import { createRepoPublicLink, createRepoPublishLink, deletePublicLink, deletePublishLink } from "@service/clasor";
import { getMe } from "./auth";

export const createRepoPublishLinkAction = async (
  repoId: number,
  expireTime?: number,
  password?: string
) => {
  const userInfo = await getMe();
  try {
    const response = await createRepoPublishLink(
      userInfo.access_token,
      repoId,
      expireTime,
      password
    );

    return response;
  } catch (error) {
    console.log("============ error ==========", error);
  }
};

export const deletePublishLinkAction = async (
  repoId: number,
) => {
  const userInfo = await getMe();
  try {
    const response = await deletePublishLink(
      userInfo.access_token,
      repoId,
    );

    return response;
  } catch (error) {
    console.log("============ error ==========", error);
  }
};
