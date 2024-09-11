"use server";

import {
  acceptUserToRepoRequest,
  getUserToRepoRequests,
  rejectUserToRepoRequest,
} from "@service/clasor";
import { getMe } from "./auth";

export const getUserToRepoRequestsAction = async (
  offset: number,
  size: number,
) => {
  const userInfo = await getMe();
  try {
    const response = await getUserToRepoRequests(
      userInfo.access_token,
      offset,
      size,
    );

    return response;
  } catch (error) {
    console.log("============ error ==========", error);
  }
};

export const acceptUserToRepoRequestAction = async (requestId: number) => {
  const userInfo = await getMe();
  try {
    const response = await acceptUserToRepoRequest(
      userInfo.access_token,
      requestId,
    );

    return response;
  } catch (error) {
    console.log("============ error ==========", error);
  }
};

export const rejectUserToRepoRequestAction = async (requestId: number) => {
  const userInfo = await getMe();
  try {
    const response = await rejectUserToRepoRequest(
      userInfo.access_token,
      requestId,
    );

    return response;
  } catch (error) {
    console.log("============ error ==========", error);
  }
};
