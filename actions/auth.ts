"use server";

import { cookies, headers } from "next/dist/client/components/headers";
import { decryptKey, encryptKey } from "@utils/crypto";
import { getPodAccessToken, refreshPodAccessToken, revokePodToken } from "@service/account";

import { IActionError } from "@interface/app.interface";
import { getCustomPostByDomain } from "@service/social";
import { handleActionError } from "@utils/error";
import jwt from "jsonwebtoken";
import { normalizeError } from "@utils/normalizeActionError";
import { redirect } from "next/navigation";
import {
  userInfo,
} from "@service/clasor";

const refreshCookieHeader = async (rToken: string, clientId: string, clientSecret: string) => {
  const response = await refreshPodAccessToken(rToken, clientId, clientSecret);
  const { access_token, refresh_token } = response;

  // get domain and find proper custom post base on domain
  const domain = headers().get("host");
  if (!domain) {
    throw new Error("Domain is not found");
  }

  const { cryptoInitVectorKey, cryptoSecretKey } =
    await getCustomPostByDomain(domain);

  const encryptedData = encryptKey(
    JSON.stringify({
      access_token,
      refresh_token,
    }),
    cryptoSecretKey,
    cryptoInitVectorKey
  );

  const token = jwt.sign(encryptedData, process.env.JWT_SECRET_KEY as string);
  cookies().set("token", token, {
    httpOnly: true,
    secure: process.env.SECURE === "TRUE",
    path: "/",
    maxAge: 60 * 60 * 24,
    sameSite: "lax",
  });

  const userData = await userInfo(access_token);
  return {
    ...userData,
    access_token,
    refresh_token,
  };
};

export const getMe = async () => {
  const encodedToken = cookies().get("token")?.value;
  if (!encodedToken) {
    return redirect("/signin");
  }

  const payload = jwt.verify(
    encodedToken,
    process.env.JWT_SECRET_KEY as string
  ) as string;

  // get domain and find proper custom post base on domain
  const domain = headers().get("host");
  if (!domain) {
    throw new Error("Domain is not found");
  }

  const { cryptoSecretKey, cryptoInitVectorKey, clientId, clientSecret } =
    await getCustomPostByDomain(domain);

  const tokenInfo = JSON.parse(
    decryptKey(payload, cryptoSecretKey, cryptoInitVectorKey)
  ) as {
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
      try {
        return refreshCookieHeader(tokenInfo.refresh_token, clientId, clientSecret);
      } catch (refreshTokenError) {
        return handleActionError(refreshTokenError as IActionError);
      }
    }
    return handleActionError(error as IActionError);
  }
};

export const userInfoAction = async () => {
  try {
    const encodedToken = cookies().get("token")?.value;
    if (!encodedToken) {
      return null;
    }
    return getMe();
  } catch (error) {
    return normalizeError(error as IActionError);
  }
};

export const login = async () => {
  // get domain and find proper custom post base on domain
  const domain = headers().get("host");
  if (!domain) {
    throw new Error("Domain is not found");
  }

  const { clientId } = await getCustomPostByDomain(domain);
  const url =
    `${process.env.ACCOUNTS}/oauth2/authorize/index.html?client_id=${clientId}&response_type=code&redirect_uri=${decodeURIComponent(
      `${process.env.SECURE === "TRUE" ? "https" : "http"}://${domain}/signin`
    )}&scope=profile`.replace("http:", "https:");
  redirect(url);
};

export const getUserToken = async (code: string, redirectUrl: string) => {
  const domain = headers().get("host");
  if (!domain) {
    throw new Error("Domain is not found");
  }

  const { clientId, clientSecret, cryptoInitVectorKey, cryptoSecretKey } =
    await getCustomPostByDomain(domain);
  const { access_token, refresh_token } = await getPodAccessToken(
    code,
    redirectUrl,
    clientId,
    clientSecret
  );

  const encryptedData = encryptKey(
    JSON.stringify({
      access_token,
      refresh_token,
    }),
    cryptoSecretKey,
    cryptoInitVectorKey
  );

  const token = jwt.sign(encryptedData, process.env.JWT_SECRET_KEY as string);
  cookies().set("token", token, {
    httpOnly: true,
    secure: process.env.SECURE === "TRUE",
    path: "/",
    maxAge: 60 * 60 * 24,
    sameSite: "lax",
  });

  return {};
};

export const logoutAction = async () => {
  const encodedToken = cookies().get("token")?.value;
  if (!encodedToken) {
    return;
  }
  try {
    const payload = jwt.verify(
      encodedToken,
      process.env.JWT_SECRET_KEY as string
    ) as string;

    // get domain and find proper custom post base on domain
    const domain = headers().get("host");
    if (!domain) {
      throw new Error("Domain is not found");
    }

    const { cryptoSecretKey, cryptoInitVectorKey, clientId, clientSecret } =
      await getCustomPostByDomain(domain);

    const { access_token, refresh_token } = JSON.parse(
      decryptKey(payload, cryptoSecretKey, cryptoInitVectorKey)
    ) as {
      access_token: string;
      refresh_token: string;
    };

    await revokePodToken(clientId, clientSecret, access_token, "access_token");
    await revokePodToken(
      clientId,
      clientSecret,
      refresh_token,
      "refresh_token"
    );

    cookies().delete("token");
  } catch (error) {
    cookies().delete("token");
    return normalizeError(error as IActionError);
  }
};
