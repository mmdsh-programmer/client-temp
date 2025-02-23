"use server";

import {
  acceptSubscription,
  getDomainSubscription,
  rejectSubscription,
} from "@service/clasor";
import { getMe } from "./auth";
import { normalizeError } from "@utils/normalizeActionError";
import { IActionError } from "@interface/app.interface";

export const getDomainSubscriptionAction = async (
  offset: number,
  size: number
) => {
  const userInfo = await getMe();
  // const domain = headers().get("host");
  // if (!domain) {
  //   throw new Error("Domain is not found");
  // }
  const domain = "http://zahraesp.ir";
  try {
    const response = await getDomainSubscription(
      userInfo.access_token,
      domain,
      offset,
      size
    );
    return response;
  } catch (error) {
    return normalizeError(error as IActionError);
  }
};

export const rejectSubscriptionAction = async (requestId: number) => {
  const userInfo = await getMe();
  // const domain = headers().get("host");
  // if (!domain) {
  //   throw new Error("Domain is not found");
  // }
  const domain = "http://zahraesp.ir";
  try {
    const response = await rejectSubscription(
      userInfo.access_token,
      domain,
      requestId
    );
    return response;
  } catch (error) {
    return normalizeError(error as IActionError);
  }
};

export const acceptSubscriptionAction = async (requestId: number) => {
  const userInfo = await getMe();
  // const domain = headers().get("host");
  // if (!domain) {
  //   throw new Error("Domain is not found");
  // }
  const domain = "http://zahraesp.ir";
  try {
    const response = await acceptSubscription(
      userInfo.access_token,
      domain,
      requestId
    );
    return response;
  } catch (error) {
    return normalizeError(error as IActionError);
  }
};
