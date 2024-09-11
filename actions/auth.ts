"use server";

import { cookies } from "next/dist/client/components/headers";
import { redirect } from "next/navigation";
import jwt from "jsonwebtoken";
import { decryptKey, encryptKey } from "@utils/crypto";
import {
  getToken,
  handleRedirect,
  renewToken,
  userInfo,
} from "@service/clasor";

const { JWT_SECRET_KEY, SECURE } = process.env;

const refreshCookieHeader = async (rToken: string) => {
  const response = await renewToken(rToken);
  const { accessToken, refreshToken } = response;

  const encryptedData = encryptKey(
    JSON.stringify({
      access_token: accessToken,
      refresh_token: refreshToken,
    }),
  );

  const token = jwt.sign(encryptedData, JWT_SECRET_KEY as string);
  cookies().set("token", token, {
    httpOnly: true,
    secure: SECURE === "true",
    path: "/",
    maxAge: 60 * 60 * 24,
    sameSite: "lax",
  });

  const userData = await userInfo(accessToken);
  return {
    ...userData,
    access_token: accessToken,
    refresh_token: refreshToken,
  };
};

export const getMe = async () => {
  const encodedToken = cookies().get("token")?.value;
  if (!encodedToken) {
    redirect("/signin");
  }

  const payload = jwt.verify(encodedToken, JWT_SECRET_KEY as string) as string;
  const tokenInfo = JSON.parse(decryptKey(payload)) as {
    access_token: string;
    refresh_token: string;
  };

  try {
    const userData = await userInfo(tokenInfo.access_token);
    return {
      ...userData,
      access_token: tokenInfo.access_token,
      refresh_token: tokenInfo.refresh_token,
    };
  } catch {
    return refreshCookieHeader(tokenInfo.refresh_token);
  }
};

export const login = async (redirectUrl: string) => {
  const response = await handleRedirect(redirectUrl);
  redirect(response.data.url);
};

export const getUserToken = async (code: string, redirect_uri: string) => {
  const response = await getToken(code, redirect_uri);
  const { accessToken, refreshToken } = response;

  const encryptedData = encryptKey(
    JSON.stringify({
      access_token: accessToken,
      refresh_token: refreshToken,
    }),
  );

  const token = jwt.sign(encryptedData, JWT_SECRET_KEY as string);
  cookies().set("token", token, {
    httpOnly: true,
    secure: SECURE === "true",
    path: "/",
    maxAge: 60 * 60 * 24,
    sameSite: "lax",
  });

  return { ...response };
};
