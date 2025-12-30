/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { useEffect } from "react";
import { getMessaging, onMessage } from "firebase/messaging";
import useFirebase from "@hooks/pushNotif/useFirebase";
import useGetUser from "@hooks/auth/useGetUser";

// Status constants
const STATUS = {
  RECEIVED: 25,
  DISMISSED: 27,
  SEEN: 29,
};

// Helper to send status updates
const sendStatus = async (
  status: number,
  messageId: string,
  token: string,
  accessToken?: string,
) => {
  try {
    const url = `${process.env.NEXT_PUBLIC_PUSH_NOTIFICATION}/service/push/device/status`;
    const body = {
      status,
      messageId,
      registrationToken: token,
      data: [],
    };

    await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        ...(accessToken && { Apitoken: accessToken }),
      },
      body: JSON.stringify(body),
    });
  } catch (error) {
    console.error("Error sending push status:", error);
  }
};

const PushNotification = () => {
  const { data: userInfo } = useGetUser();

  // Initialize hook to register SW and get token
  const { fcmToken } = useFirebase(userInfo?.ssoId, userInfo?.access_token);

  useEffect(() => {
    if (!fcmToken || !userInfo) return;

    const messaging = getMessaging();

    // Listen for messages when the app is in the FOREGROUND
    const unsubscribe = onMessage(messaging, (payload: any) => {
      console.log("[PushNotification] Foreground message received:", payload);

      const { messageId } = payload.data;

      // Parse body safely
      let bodyData;
      try {
        bodyData =
          typeof payload.data.body === "string" ? JSON.parse(payload.data.body) : payload.data.body;
      } catch (e) {
        bodyData = {};
      }

      // 1. Report "RECEIVED" status
      sendStatus(STATUS.RECEIVED, messageId, fcmToken, userInfo.access_token);

      // Verify if the notification belongs to the current user (if SSO check is needed)
      // Note: Cast to number (+) ensures safe comparison
      if (!bodyData.ssoId || +userInfo.ssoId === +bodyData.ssoId) {
        // 2. Create a browser system notification manually
        const notification = new Notification(payload.data.title, {
          body: bodyData.content || payload.data.body,
          icon: bodyData.profileImage || `${process.env.NEXT_PUBLIC_CLIENT_URL}clasor-icon.svg`,
          dir: "rtl",
          requireInteraction: true,
          tag: messageId, // Prevents duplicates
        });

        // 3. Handle Click Event
        notification.onclick = (event) => {
          event.preventDefault();
          notification.close();

          // Report "SEEN" status
          sendStatus(STATUS.SEEN, messageId, fcmToken, userInfo.access_token);

          // Open target link
          const link = payload.data.link || "https://clasor-frontend.sandpod.ir/";
          window.open(link, "_blank")?.focus();
        };

        // 4. Handle Close/Dismiss Event
        notification.onclose = () => {
          // Report "DISMISSED" status
          sendStatus(STATUS.DISMISSED, messageId, fcmToken, userInfo.access_token);
        };
      }
    });

    // Cleanup listener on unmount
    return () => {
      unsubscribe();
    };
  }, [fcmToken, userInfo]);

  return null;
};

export default PushNotification;
