"use server";

import { getMe } from "./auth";

import { addUserToFeedbackGroupHash, sendFeedback } from "@service/clasor";

export const addUserToFeedbackGroupHashAction = async () => {
  const userInfo = await getMe();

  const result = await addUserToFeedbackGroupHash(userInfo.access_token);
  return result;
};

export const sendFeedbackAction = async (
  content: string,
  fileHashList: string[]
) => {
  const userInfo = await getMe();

  const result = await sendFeedback(
    userInfo.access_token,
    content,
    fileHashList
  );
  return result;
};
