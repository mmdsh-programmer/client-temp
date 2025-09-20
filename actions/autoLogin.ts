// File: actions/auth.ts

"use server";

import * as forge from "node-forge";
import { getMe } from "./auth";
import { handshake, initiateAutoLogin } from "@service/account";
import { normalizeError } from "@utils/normalizeActionError";
import { IActionError } from "@interface/app.interface";

export const initiateAutoLoginAction = async () => {
  try {
    const userInfo = await getMe();
    const accessToken = userInfo.access_token;

    const handshakeResponse = await handshake(accessToken);
    const { privateKey, keyId } = handshakeResponse;
    if (!privateKey || !keyId) {
      throw new Error("Key data not received from handshake.");
    }

    const timestamp = Date.now();
    const dataToSign = `access_token: ${accessToken}\nkey_id: ${keyId}\ntimestamp: ${timestamp}`;

    const privateKeyObject = forge.pki.privateKeyFromPem(privateKey);

    const md = forge.md.sha256.create();
    md.update(dataToSign, "utf8");

    const signatureBytes = privateKeyObject.sign(md);

    const signature = forge.util.encode64(signatureBytes);

    const submitAutoLogin = await initiateAutoLogin(keyId, timestamp, signature, accessToken);

    return submitAutoLogin;
  } catch (error: any) {
    console.error("Auto-login action failed:", error);
    if (error.response?.data) {
      console.error("API Error details:", error.response.data);
    }
    return normalizeError(error as IActionError);
  }
};
