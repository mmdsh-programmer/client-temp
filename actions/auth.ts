"use server";

import { decryptKey, encryptKey } from "@utils/crypto";
import {
  getToken,
  renewToken,
  userInfo,
} from "@service/clasor";

import { IActionError } from "@interface/app.interface";
import { cookies } from "next/dist/client/components/headers";
import { getCustomPostByDomain } from "@service/social";
import { getPodAccessToken } from "@service/account";
import jwt from "jsonwebtoken";
import { redirect } from "next/navigation";

const { JWT_SECRET_KEY, SECURE, ACCOUNTS } = process.env;

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
        const userData = await userInfo(`${tokenInfo.access_token}`);
        return {
          ...userData,
          access_token: tokenInfo.access_token,
          refresh_token: tokenInfo.refresh_token,
        };
      } catch (error: unknown) {
        if ((error as IActionError)?.errorCode === 401) {
          return refreshCookieHeader(tokenInfo.refresh_token);
        }
        throw error;
      }
};

export const login = async (domain) => {
  // get domain and find proper custom post base on domain
  const { clientId } = await getCustomPostByDomain(domain);
  const url = (`${ACCOUNTS}/oauth2/authorize/index.html?client_id=${clientId}&response_type=code&redirect_uri=${decodeURIComponent(
    `${domain  }/signin`
  )}&scope=profile`).replace("http:", "https:");
  redirect(url);
};

export const getUserToken = async (domain: string, code: string, redirectUrl: string) => {
  const { clientId, clientSecret } = await getCustomPostByDomain(domain);
  const { access_token, refresh_token } = await getPodAccessToken(code, redirectUrl, clientId, clientSecret);

  const encryptedData = encryptKey(
    JSON.stringify({
      access_token,
      refresh_token,
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

  return {};
};
