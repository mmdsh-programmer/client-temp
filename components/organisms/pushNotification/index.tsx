/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { useEffect } from "react";
import { getMessaging, onMessage } from "firebase/messaging";
import useFirebase from "@hooks/pushNotif/useFirebase";
import useGetUser from "@hooks/auth/useGetUser";

const PUSH_SEEN = 29;
const PUSH_DISMISSED = 27;
const PUSH_RECEIVED = 25;

const sendStatus = (config: any) => {
  try {
    const url = `${process.env.NEXT_PUBLIC_PUSH_NOTIFICATION}/push/device/status`;
    const data = {
      status: config.status,
      messageId: config.messageId,
      registrationToken: config.registrationToken,
    };

    fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  } catch (error) {
    console.log(error);
  }
};

const PushNotification = () => {
  // ---------------- HOOKS -------------------------
  const { data: userInfo } = useGetUser();
  const { fcmToken, permissionStatus } = useFirebase(userInfo?.ssoId, userInfo?.access_token);

  useEffect(() => {

    if (!fcmToken) {
      return;
    }
    const messaging = getMessaging();

    onMessage(messaging, (payload: any) => {
      sendStatus({
        status: PUSH_RECEIVED,
        messageId: payload.data.messageId,
        registrationToken: fcmToken,
        data: [],
      });
      const body = JSON.parse(payload.data.body);
      if (+userInfo!.ssoId !== +body.ssoId) {
        const notification = new Notification(`${payload.data.title}`, {
          body: payload.data.body,
          icon: body.profileImage ?? `${process.env.NEXT_PUBLIC_CLIENT_URL}clasor-icon.svg`,
          // image: `${process.env.NEXT_PUBLIC_CLIENT_URL}clasor.jpg`,
          dir: "rtl",
          requireInteraction: true,
        });
        notification.addEventListener("click", () => {
          sendStatus({
            status: PUSH_SEEN,
            messageId: payload.data.messageId,
            registrationToken: fcmToken,
            data: [],
          });
          if (payload.data.link) window.open(payload.data.link);
        });
        notification.addEventListener("close", (e) => {
          sendStatus({
            status: PUSH_DISMISSED,
            messageId: payload.data.messageId,
            registrationToken: fcmToken,
            data: [],
          });
        });
        notification.onclick = function () {
          const myWindow = window.open("https://clasor-frontend.sandpod.ir/", "_blank");
          myWindow?.focus();
        };
      }
    });
  }, [fcmToken]);
  return null;
};

export default PushNotification;
