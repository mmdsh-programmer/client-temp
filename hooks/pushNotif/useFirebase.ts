/* eslint-disable import/no-extraneous-dependencies */
import { useEffect, useRef, useState, useCallback } from "react";
import { getMessaging, getToken } from "firebase/messaging";
import FingerprintJS from "@fingerprintjs/fingerprintjs";
import { firebaseInstance } from "@utils/firebase";

interface DeviceConfig {
  isSubscriptionRequest: boolean;
  platform: string;
  appId: string | undefined;
  deviceId: string;
  ssoId: number;
  data: never[];
  registrationToken: string;
  accessToken: string;
}

const getBrowserType = () => {
  if (typeof navigator === "undefined") return "_no";
  const { userAgent } = navigator;

  if (/chrome|chromium|crios/i.test(userAgent)) return "1_ch";
  if (/firefox|fxios/i.test(userAgent)) return "_fi";
  if (/safari/i.test(userAgent)) return "_sa";
  if (/opr\//i.test(userAgent)) return "_op";
  if (/edg/i.test(userAgent)) return "_ed";

  return "_no";
};

const createHash = async () => {
  try {
    const fp = await FingerprintJS.load();
    const { visitorId } = await fp.get();
    return visitorId + getBrowserType();
  } catch (e) {
    console.error("notification: Error creating hash:", e);
    return null;
  }
};

const registerDevice = async (config: DeviceConfig) => {
  console.log("notification: Sending API Request...", {
    deviceId: config.deviceId,
  });

  const url = "https://api.sandpod.ir/srv/notif-sandbox/push/device/subscribe";

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        ...(config.accessToken && { Apitoken: config.accessToken }),
      },
      body: JSON.stringify(config),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    console.log("notification:  Device registered successfully.");
  } catch (error) {
    console.error("notification:  API Error:", error);
  }
};

export default function useFirebase(ssoId?: number, accessToken?: string) {
  const [token, setToken] = useState<string | null>(null);
  const [permissionStatus, setPermissionStatus] = useState<NotificationPermission | null>(null);

  const timerRef = useRef<number | null>(null);
  const retryRef = useRef(0);

  const handleRegisterServiceWorker = useCallback(async () => {
    try {
      if (retryRef.current >= 3) return;
      retryRef.current += 1;

      if (typeof window !== "undefined" && "serviceWorker" in navigator) {
        const registration = await navigator.serviceWorker.register("/firebase-messaging-sw.js");
        if (registration) registration.update();

        const messaging = getMessaging(firebaseInstance);
        const permission = await Notification.requestPermission();
        setPermissionStatus(permission);

        if (permission !== "granted") return;

        const fcmToken = await getToken(messaging, {
          vapidKey: process.env.NEXT_PUBLIC_VAPIDKEY,
        });

        if (!fcmToken) return;

        console.log("notification:  FCM Token retrieved.");

        if (!ssoId || !accessToken) {
          console.error("notification:  ssoId is missing, aborting.");
          return;
        }

        const hash = await createHash();
        if (!hash) return;

        console.log("notification: Hash created");

        await registerDevice({
          isSubscriptionRequest: true,
          platform: "WEB",
          appId: process.env.NEXT_PUBLIC_APPID,
          deviceId: hash,
          ssoId,
          data: [],
          registrationToken: fcmToken,
          accessToken,
        });

        setToken(fcmToken);
      }
    } catch (error) {
      console.error("notification: Error in flow:", error);
      setTimeout(() => {
        return handleRegisterServiceWorker();
      }, 1000);
    }
  }, [ssoId, accessToken]);

  useEffect(() => {
    if (!ssoId || !accessToken) return;

    if (timerRef.current) window.clearTimeout(timerRef.current);

    timerRef.current = window.setTimeout(() => {
      handleRegisterServiceWorker();
    }, 100);

    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, [ssoId, accessToken, handleRegisterServiceWorker]);

  return {
    fcmToken: token,
    permissionStatus,
  };
}
