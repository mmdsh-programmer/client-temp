"use server";

import * as forge from "node-forge";
import { getMe } from "./auth";
import { handshake, initiateAutoLogin } from "@service/account";
import { normalizeError } from "@utils/normalizeActionError";
import { IActionError } from "@interface/app.interface";
import { getCustomPostByDomainAction } from "./domain";
import { getDomainHost } from "@utils/getDomain";
import { getCustomPostByDomain } from "@service/clasor";

export const initiateAutoLoginAction = async () => {
  try {
    const userInfo = await getMe();
    const accessToken = userInfo.access_token;

    const domain = await getDomainHost();

    if (!domain) {
      throw new Error("Domain is not found");
    }
    const domainInfo = await getCustomPostByDomain(domain);

    const handshakeResponse = await handshake(accessToken);
    const { privateKey, keyId } = handshakeResponse;

    const timestamp = Date.now();
    const dataToSign = `access_token: ${accessToken}\nkey_id: ${keyId}\ntimestamp: ${timestamp}`;

    const privateKeyObject = forge.pki.privateKeyFromPem(privateKey);

    const md = forge.md.sha256.create();
    md.update(dataToSign);

    const signatureBytes = privateKeyObject.sign(md);

    const signature = forge.util.encode64(signatureBytes);

    const submitAutoLogin = await initiateAutoLogin(keyId, timestamp, signature, accessToken);
    // const redirectUri = `https://docs.sandpod.ir?access_token=${accessToken}&key_id=${keyId}&timestamp=${timestamp}&signature=${signature}`;
    const redirectUri = `${decodeURIComponent("https://docs.sandpod.ir/signin")}&scope=login`;
    const loginUrl = `${process.env.ACCOUNTS}/oauth2/authorize/?client_id=${domainInfo.clientId}&response_type=code&scope=login&auto_login_code=${submitAutoLogin.auto_login_code}&redirect_uri=${redirectUri}`;
    return loginUrl;
  } catch (error: any) {
    console.error("Auto-login action failed:", error);
    if (error.response?.data) {
      console.error("API Error details:", error.response.data);
    }
    return normalizeError(error as IActionError);
  }
};
