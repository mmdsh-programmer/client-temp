import { IGetTokenResponse } from "@interface/app.interface";
import Logger from "@utils/logger";
import axios from "axios";

const axiosAccountsInstance = axios.create({
  baseURL: process.env.ACCOUNTS,
});

axiosAccountsInstance.interceptors.request.use((request) => {
  const { headers, baseURL, method, url, data } = request;
  const log = JSON.stringify({
    headers,
    baseURL,
    method,
    url,
    data,
  });

  Logger.info(log);
  return request;
});

axiosAccountsInstance.interceptors.response.use((response) => {
  const { data, status } = response;

  const log = JSON.stringify({
    data,
    status,
  });

  Logger.info(log);
  return response;
});

// TODO: proper handler for error

export const getPodAccessToken = async (
  code: string,
  redirectUrl: string,
  clientId: string,
  clientSecret: string
): Promise<IGetTokenResponse> => {
  try {
    const url = "/oauth2/token";
    const options = {
      code,
      grant_type: "authorization_code",
      client_id: clientId,
      client_secret: clientSecret,
      redirect_uri: redirectUrl,
    };
    const headers = {
      "Content-Type": "application/x-www-form-urlencoded",
    };
    const result = await axiosAccountsInstance.post<IGetTokenResponse>(
      url,
      options,
      {
        headers,
      }
    );
    return result.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// export const getPodUserInfo = async (res: Response, token: string): Promise<any> => {
//     try {
//       const ssoStartTime = Date.now();
//       // check cache
//       const cacheUser = await getKey(`user-${token}`);
//       if (cacheUser) {
//         return JSON.parse(cacheUser);
//       }
//       const result = await axios.get<PlatformGetUserResponse>(
//         `${CORE_ADDRESS}/getUserProfile`,
//         {
//           headers: {
//             _token_: token,
//             _token_issuer_: 1,
//             "X-Request-Cls-Ref": res.clasorReferenceNumber
//           },
//         }
//       );
//       if (result.data.hasError) {
//         throw result;
//       }

//       await setKey(`user-${token}`, JSON.stringify(result.data.result), 14 * 60);

//       res.clasorSsoTime += Date.now() - ssoStartTime;
//       return result.data.result;
//     } catch (e) {
//       res.errorPoint = EErrorPoints.sso;
//       if (e.data?.errorCode === 21) {
//         throw { code: 401, type: NOT_AUTHORIZED, message: "authRefreshTokenIsInvalid", originalMessage: e };
//       }
//       else throw { code: 500, type: THIRD_PARTY_DOWN, message: "thirdPartyDown", originalMessage: e };
//     }
//   };
