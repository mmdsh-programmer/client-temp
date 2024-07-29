import { createTag, deleteTag, editTag, getRepositoryTags } from "@service/clasor";
import { getMe } from "./auth";

export const getRepositoryTagAction = async (
  repoId: number | undefined,
  offset: number,
  size: number
) => {
  const userInfo = await getMe();
  try {
    const response = await getRepositoryTags(
      userInfo.access_token,
      repoId,
      offset,
      size
    );

    return response;
  } catch (error) {
    console.log("============ error ==========", error);
  }
};

export const createTagAction = async (
  repoId: number,
  name: string,
) => {
  const userInfo = await getMe();
  try {
    const response = await createTag(
      userInfo.access_token,
      repoId,
      name,
    );

    return response;
  } catch (error) {
    console.log("============ error ==========", error);
  }
};

export const editTagAction = async (
    repoId: number,
    tagId: number,
    name: string,
  ) => {
    const userInfo = await getMe();
    try {
      const response = await editTag(
        userInfo.access_token,
        repoId,
        tagId,
        name,
      );
  
      return response;
    } catch (error) {
      console.log("============ error ==========", error);
    }
  };

  export const deleteTagAction = async (
    repoId: number,
    tagId: number,
  ) => {
    const userInfo = await getMe();
    try {
      const response = await deleteTag(
        userInfo.access_token,
        repoId,
        tagId,
      );
  
      return response;
    } catch (error) {
      console.log("============ error ==========", error);
    }
  };
