/* eslint-disable unicorn/filename-case */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */

// --- 1. Read Configuration from URL Parameters ---
// "self.location.search" contains the query string passed during registration
const urlParams = new URLSearchParams(self.location.search);

// Retrieve the base URL passed from the React app
// If not provided, use a hardcoded fallback or throw an error
const BASE_URL = "https://api.sandpod.ir/srv/notif-sandbox";
const API_TOKEN = "0277d9a4f79d45d8bce39967e6d03ccf.XzIwMjM5";

// Debugging: Log to ensure it's working
console.log("[Service Worker] Config loaded:", { BASE_URL, hasToken: API_TOKEN });

// Import Firebase scripts
importScripts("https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js");

// Status codes required by the server (Update these values if the server expects strings)
const STATUS_TYPES = {
  RECEIVED: 25, // Code for when the notification reaches the device
  SEEN: 30, // Code for when the user clicks the notification
  DISMISSED: 40, // Code for when the user closes the notification
};

const firebaseConfig = {
  apiKey: "AIzaSyCd77oDdFact3bgoyixxfQTa8wWiJxMrVY",
  authDomain: "podnotification-88758.firebaseapp.com",
  databaseURL: "https://podnotification-88758-default-rtdb.firebaseio.com",
  projectId: "podnotification-88758",
  storageBucket: "podnotification-88758.appspot.com",
  messagingSenderId: "309762851928",
  appId: "66ff225a-031a-4aef-b004-0debf78e3dd5",
  measurementId: "G-D325BCEYEB",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

// --- Helper Functions ---

/**
 * Retrieves the current Firebase Cloud Messaging registration token.
 */
async function getRegistrationToken() {
  return messaging.getToken({
    vapidKey:
      "BKKqFoBjWi-Bg7pQF7y4W0kFQ-BB62o6Oo_ANzB8Lk8S1q_LH9U5V7DDSR4pRVeV84PQKllSw-WrP4f1G-F8tVE",
  });
}

/**
 * Sends the notification status (Received, Seen, Dismissed) to the backend server.
 * @param {Object} statusInfo - Contains status code, messageId, etc.
 */
async function sendStatusToServer(statusInfo) {
  try {
    const token = statusInfo.token || (await getRegistrationToken());

    // Construct the request body matching the server's expected format
    const bodyData = {
      status: statusInfo.status,
      messageId: statusInfo.messageId,
      registrationToken: token,
      // Default values are used if not provided in the payload
      deviceId: statusInfo.deviceId || "UNKNOWN_DEVICE",
      appId: statusInfo.appId || firebaseConfig.appId,
      ssoId: statusInfo.ssoId || null,
    };

    await fetch(`${BASE_URL}/service/push/device/status`, {
      method: "POST", // Using POST as standard for sending body data
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        apiToken: API_TOKEN,
      },
      body: JSON.stringify(bodyData),
    });
  } catch (error) {
    console.error("[Service Worker] Error sending status:", error);
  }
}

// --- Background Message Handler ---
// Triggered when the app is in the background and a push notification arrives.
messaging.onBackgroundMessage(async (payload) => {
  try {
    const { title, icon, image, dir, requireInteraction, link, messageId, deviceId, ssoId, appId } =
      payload.data;

    // 1. Prepare Notification Options
    const notificationOptions = {
      body: payload.data.body || "",
      icon,
      image,
      dir,
      requireInteraction: !!requireInteraction, // Convert to boolean
      actions: [{ action: "close", title: "Close" }], // Button to dismiss

      // CRITICAL: Persist data needed for the 'click' event handler later
      data: {
        link,
        messageId,
        deviceId,
        ssoId,
        appId,
      },
    };

    // 2. Show the Notification
    await self.registration.showNotification(title, notificationOptions);

    // 3. Report "RECEIVED" status to the server immediately
    await sendStatusToServer({
      status: STATUS_TYPES.RECEIVED,
      messageId,
      deviceId,
      ssoId,
      appId,
    });
  } catch (error) {
    console.error("[Service Worker] Background message error:", error);
  }
});

// --- Notification Click Event Listener ---
// Triggered when the user interacts with the notification (click or action button).
// NOTE: This listener is placed outside the messaging handler to prevent duplicate listeners.
self.addEventListener("notificationclick", async (event) => {
  event.notification.close(); // Close the notification immediately

  // Retrieve custom data saved during 'showNotification'
  const { link, messageId, deviceId, ssoId, appId } = event.notification.data;

  // Determine status: 'DISMISSED' if close button was clicked, otherwise 'SEEN'
  const status = event.action === "close" ? STATUS_TYPES.DISMISSED : STATUS_TYPES.SEEN;

  const promiseChain = Promise.all([
    // 1. Report the status to the server
    sendStatusToServer({
      status,
      messageId,
      deviceId,
      ssoId,
      appId,
    }),

    // 2. Open the URL or focus on the existing tab
    clients.matchAll({ type: "window", includeUncontrolled: true }).then((windowClients) => {
      const urlToOpen = link || self.location.origin;

      // Focus if tab is already open
      for (const client of windowClients) {
        if (client.url === urlToOpen && "focus" in client) {
          return client.focus();
        }
      }
      // Open new window if not open
      if (clients.openWindow) {
        return clients.openWindow(urlToOpen);
      }
    }),
  ]);

  // Keep the service worker alive until promises resolve
  event.waitUntil(promiseChain);
});

// Handler to skip waiting and activate the new service worker immediately
self.addEventListener("message", (event) => {
  if (event.data && event.data.action === "skipWaiting") {
    self.skipWaiting();
  }
});
