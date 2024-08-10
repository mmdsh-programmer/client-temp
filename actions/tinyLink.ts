import { createTinyLink } from "@service/clasor";
import { getMe } from "./auth";

export const createTinyLinkAction = async (url: string) => {
  const userInfo = await getMe();
  try {
    const response = await createTinyLink(userInfo.access_token, url);

    return response;
  } catch (error) {
    console.log("============ error ==========", error);
  }
};
