/* eslint-disable import/no-extraneous-dependencies */
import { useEffect, useRef, useState } from "react";
import { getMessaging, getToken } from "firebase/messaging";
import FingerprintJS from "@fingerprintjs/fingerprintjs";
import { firebaseInstance } from "@utils/firebase";

let timeout: number = 0;

const getBrowserType = () => {
  const { userAgent } = navigator;
  let browserName;

  if (/chrome|chromium|crios/i.test(userAgent)) {
    browserName = "1_ch";
  } else if (/firefox|fxios/i.test(userAgent)) {
    browserName = "_fi";
  } else if (/safari/i.test(userAgent)) {
    browserName = "_sa";
  } else if (/opr\//i.test(userAgent)) {
    browserName = "_op";
  } else if (/edg/i.test(userAgent)) {
    browserName = "_ed";
  } else {
    browserName = "_no";
  }

  return browserName;
};

const createHash = async () => {
  const fp = await FingerprintJS.load();
  const { visitorId } = await fp.get();
  return visitorId + getBrowserType();
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const registerDevice = (config: any) => {
  const url = "https://api.sandpod.ir/srv/notif-sandbox/push/device/subscribe";
  const xhr = new XMLHttpRequest();
  xhr.open("POST", url);

  xhr.setRequestHeader("Accept", "application/json");
  xhr.setRequestHeader("Content-Type", "application/json");
  if (config.accessToken) {
    xhr.setRequestHeader("Apitoken", config.accessToken);
  }
  xhr.send(JSON.stringify(config));
};

export default function useFirebase(ssoId, accessToken) {
  const [token, setToken] = useState<string | null>(null);
  const [permissionStatus, setPermissionStatus] = useState<NotificationPermission | null>(null);
  const retry = useRef(0);

  const registerNewServiceWorker = async () => {
    try {
      if (retry.current === 3) {
        return;
      }
      retry.current += 1;
      if (typeof window !== "undefined" && "serviceWorker" in navigator) {
        const registration = await navigator.serviceWorker.register("/firebase-messaging-sw.js");
        if (registration) {
          registration.update();
        }
        console.log("Service Worker registration successful:", registration);

        const messaging = getMessaging(firebaseInstance);

        // Retrieve the notification permission status
        const permission = await Notification.requestPermission();
        setPermissionStatus(permission);

        // Check if permission is granted before retrieving the token
        if (permission !== "granted") {
          return;
        }
        const fcmToken = await getToken(messaging, {
          vapidKey: process.env.NEXT_PUBLIC_VAPIDKEY,
        });

        if (!fcmToken) {
          return;
        }

        const hash = await createHash();
        if (!hash || !ssoId) {
          return;
        }
        registerDevice({
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
        console.log("Registration token available.");
      } else {
        console.log("No registration token available. Request permission to generate one.");
      }
    } catch (error) {
      console.log("An error occurred while retrieving token:", error);
      registerNewServiceWorker();
    }
  };

  const unregisterServiceWorkers = async () => {
    try {
      const registrations = await navigator.serviceWorker.getRegistrations();
      for (const registration of registrations) {
        await registration.unregister();
      }
      registerNewServiceWorker();
    } catch (error) {
      console.log("Unhandle error in unregister service worker", JSON.stringify(error));
    }
  };

  useEffect(() => {
    clearTimeout(timeout);

    timeout = window.setTimeout(() => {
      if (typeof window !== "undefined" && "serviceWorker" in navigator) {
        unregisterServiceWorkers();
      }
    }, 100);
  }, []);

  return {
    fcmToken: token,
    permissionStatus,
  };
}
