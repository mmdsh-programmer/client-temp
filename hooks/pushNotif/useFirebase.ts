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

// ... (Keep getBrowserType and createHash helper functions as they were) ...
const createHash = async () => {
    // Mock implementation for brevity, keep your original logic
    const fp = await FingerprintJS.load();
    const { visitorId } = await fp.get();
    return visitorId;
};

// API call to register the device on the backend
const registerDevice = async (config: DeviceConfig) => {
  const url = `${process.env.NEXT_PUBLIC_PUSH_NOTIFICATION}/push/device/subscribe`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        // Add auth header if available
        ...(config.accessToken && { Apitoken: config.accessToken }),
      },
      body: JSON.stringify(config),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    console.log("[useFirebase] Device registered successfully.");
  } catch (error) {
    console.error("[useFirebase] API Error:", error);
  }
};

export default function useFirebase(ssoId?: number, accessToken?: string) {
  const [token, setToken] = useState<string | null>(null);
  const [permissionStatus, setPermissionStatus] = useState<NotificationPermission | null>(null);
  
  // Ref to prevent infinite retry loops
  const retryRef = useRef(0);

  const handleRegisterServiceWorker = useCallback(async () => {
    try {
      if (typeof window === "undefined" || !("serviceWorker" in navigator)) return;
      
      // Do not proceed if user credentials are missing
      if (!ssoId || !accessToken) return;

      // --- CRITICAL CHANGE: Pass env vars to Service Worker via URL params ---
      const swParams = new URLSearchParams({
        apiToken: accessToken,
        baseUrl: process.env.NEXT_PUBLIC_PUSH_NOTIFICATION || "",
      });

      // Register the SW with the params
      const registration = await navigator.serviceWorker.register(
        `/firebase-messaging-sw.js?${swParams.toString()}`
      );
      
      if (registration) {
        registration.update();
      }

      const messaging = getMessaging(firebaseInstance);
      const permission = await Notification.requestPermission();
      setPermissionStatus(permission);

      if (permission !== "granted") return;

      // Get FCM Token
      const fcmToken = await getToken(messaging, {
        vapidKey: process.env.NEXT_PUBLIC_VAPIDKEY,
      });

      if (!fcmToken) return;

      // Avoid re-registering if token hasn't changed (optional optimization)
      // if (fcmToken === token) return;

      const hash = await createHash();
      if (!hash) return;

      // Register device on backend
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

    } catch (error) {
      console.error("[useFirebase] Error in registration flow:", error);
      
      // Retry logic (max 3 times)
      if (retryRef.current < 3) {
        retryRef.current += 1;
        setTimeout(handleRegisterServiceWorker, 2000);
      }
    }
  }, [ssoId, accessToken]); // Re-run if auth details change

  useEffect(() => {
    handleRegisterServiceWorker();
  }, [handleRegisterServiceWorker]);

  return {
    fcmToken: token,
    permissionStatus,
  };
}