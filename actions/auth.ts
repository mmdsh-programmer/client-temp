"use server";

import { cookies, headers } from "next/headers";
import { decryptKey, encryptKey } from "@utils/crypto";
import {
  editSocialProfile,
  getMySocialProfile,
} from "@service/social";
import { getCustomPostByDomain, userInfo, userMetadata } from "@service/clasor";
import {
  getPodAccessToken,
  refreshPodAccessToken,
  revokePodToken,
} from "@service/account";
import { IActionError } from "@interface/app.interface";
import { getRedisClient } from "@utils/redis";
import jwt from "jsonwebtoken";
import { normalizeError } from "@utils/normalizeActionError";
import { redirect } from "next/navigation";

const refreshCookieHeader = async (
  rToken: string,
  clientId: string,
  clientSecret: string
) => {
  const response = await refreshPodAccessToken(rToken, clientId, clientSecret);
  const { access_token, refresh_token, expires_in } = response;
  // get domain and find proper custom post base on domain
  const domain = (await headers()).get("host");
  if (!domain) {
    throw new Error("Domain is not found");
  }

  const { cryptoInitVectorKey, cryptoSecretKey } =
    await getCustomPostByDomain(domain);

  const encryptedData = encryptKey(
    JSON.stringify({
      access_token,
      refresh_token,
      expiresAt: +new Date() + ((expires_in - 60) * 1000),
    }),
    cryptoSecretKey,
    cryptoInitVectorKey
  );

  const token = jwt.sign(encryptedData, process.env.JWT_SECRET_KEY as string);
 
  (await cookies()).set("token", token, {
    httpOnly: true,
    secure: process.env.SECURE === "TRUE",
    path: "/",
    maxAge: 60 * 60 * 24,
    sameSite: "lax",
  });

  const userData = await userInfo(access_token, domain, expires_in - 60);
  const mySocialProfile = await getMySocialProfile(access_token, expires_in - 60 );
  return {
    ...userData,
    private: mySocialProfile.result.private,
    access_token,
    refresh_token,
  };
};

export const getMe = async () => {
  const encodedToken = (await cookies()).get("token")?.value;
  if (!encodedToken) {
    return redirect("/");
  }

  const payload = jwt.verify(
    encodedToken,
    process.env.JWT_SECRET_KEY as string
  ) as string;

  // get domain and find proper custom post base on domain
  const domain = (await headers()).get("host");
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
    expiresAt: number;
  };

  try {
    if(tokenInfo.expiresAt < +new Date()){
      return refreshCookieHeader(
        tokenInfo.refresh_token,
        clientId,
        clientSecret
      );
    }

    const expiresAt = Math.floor((tokenInfo.expiresAt - +new Date()) / 1000);
    const userData = await userInfo(tokenInfo.access_token, domain, expiresAt);
    const mySocialProfile = await getMySocialProfile(tokenInfo.access_token, expiresAt);
    const userDataWithPrivate = {
      ...userData,
      private: mySocialProfile.result.private,
      access_token: tokenInfo.access_token,
      refresh_token: tokenInfo.refresh_token,
    };
    return userDataWithPrivate;
  } catch (error: unknown) {
    if ((error as IActionError)?.errorCode === 401) {
      try {
        return refreshCookieHeader(
          tokenInfo.refresh_token,
          clientId,
          clientSecret
        );
      } catch (refreshTokenError) {
        return normalizeError(refreshTokenError as IActionError);
      }
    }
    return normalizeError(error as IActionError);
  }
};

export const userInfoAction = async () => {
  try {
    const encodedToken = (await cookies()).get("token")?.value;
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
  const domain = (await headers()).get("host");
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
  const domain = (await headers()).get("host");
  if (!domain) {
    throw new Error("Domain is not found");
  }

  const { clientId, clientSecret, cryptoInitVectorKey, cryptoSecretKey } =
    await getCustomPostByDomain(domain);
  const { access_token, refresh_token, expires_in } = await getPodAccessToken(
    code,
    redirectUrl,
    clientId,
    clientSecret,
    domain
  );

  

  const expiresAt = +new Date() + ((expires_in - 60) * 1000);
  const encryptedData = encryptKey(
    JSON.stringify({
      access_token,
      refresh_token,
      expiresAt,
    }),
    cryptoSecretKey,
    cryptoInitVectorKey
  );

  const token = jwt.sign(encryptedData, process.env.JWT_SECRET_KEY as string);
  (await cookies()).set("token", token, {
    httpOnly: true,
    secure: process.env.SECURE === "TRUE",
    path: "/",
    maxAge: 60 * 60 * 24,
    sameSite: "lax",
  });

  return {};
};

export const logoutAction = async () => {
  const encodedToken = (await cookies()).get("token")?.value;
  if (!encodedToken) {
    return;
  }
  try {
    const payload = jwt.verify(
      encodedToken,
      process.env.JWT_SECRET_KEY as string
    ) as string;

    // get domain and find proper custom post base on domain
    const domain = (await headers()).get("host");
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

    (await cookies()).delete("token");
    
    const redisClient = await getRedisClient();
    if(redisClient && redisClient.isReady){
      await redisClient.del(`user:${access_token}`);
      console.log(JSON.stringify({ 
        type: "Redis remove data",
        data: `user:${access_token}`,
      }, null, 0));
    }
  } catch (error) {
    (await cookies()).delete("token");
    return normalizeError(error as IActionError);
  }
};

export const userMetadataAction = async (data: object) => {
  const userData = await getMe();
  try {
    const response = await userMetadata(userData.access_token, data);

    return response;
  } catch (error) {
    return normalizeError(error as IActionError);
  }
};

export const editSocialProfileAction = async (isPrivate: boolean) => {
  const userData = await getMe();
  try {
    const response = await editSocialProfile(userData.access_token, isPrivate);
    return response;
  } catch (error) {
    return normalizeError(error as IActionError);
  }
};
