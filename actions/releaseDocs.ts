import { TUserData } from "@interface/app.interface";
import { getMe } from "./auth";
import { getPendingDrafts, getPendingVersion } from "@service/clasor";

export const getPendingDraftsAction = async (
  repoId: number | undefined,
  offset: number,
  size: number
) => {
  const userInfo = (await getMe()) as TUserData;
  try {
    const response = await getPendingDrafts(
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

export const getPendingVersionAction = async (
    repoId: number | undefined,
    offset: number,
    size: number
  ) => {
    const userInfo = (await getMe()) as TUserData;
    try {
      const response = await getPendingVersion(
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