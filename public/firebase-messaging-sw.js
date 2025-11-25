/* eslint-disable unicorn/filename-case */
/* eslint-disable no-restricted-globals */
/* eslint-disable unicorn/filename-case */
/* eslint-disable no-undef */
// Import Firebase scripts for the app and messaging
importScripts("https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js");

const CACHE_NAME = "firebase-sw-1.0.0";
// Firebase project configuration
const firebaseConfig = {
  // apiKey: "AIzaSyCd77oDdFact3bgoyixxfQTa8wWiJxMrVY",
  // authDomain: "podnotification-88758.firebaseapp.com",
  // databaseURL: "https://podnotification-88758-default-rtdb.firebaseio.com",
  // projectId: "podnotification-88758",
  // storageBucket: "podnotification-88758.appspot.com",
  // messagingSenderId: "309762851928",
  // appId: "66ff225a-031a-4aef-b004-0debf78e3dd5",
  // measurementId: "G-D325BCEYEB",

  apiKey: "AIzaSyCqNkPWfTu2Apvhc5C4z0l3IGWpd5aP4IA",
  authDomain: "prodnotification-eba19.firebaseapp.com",
  databaseURL: "https://prodnotification-eba19-default-rtdb.firebaseio.com",
  projectId: "prodnotification-eba19",
  storageBucket: "prodnotification-eba19.appspot.com",
  messagingSenderId: "923291418261",
  appId: "1:923291418261:web:4fe138fc0ded175199659c",
  measurementId: "G-L8MSQXRRDE"

};

// Initialize Firebase with the project's configuration
firebase.initializeApp(firebaseConfig);

// Initialize messaging service
const messaging = firebase.messaging();

// Subscribe to messaging service to get the current registration token
async function subscribe(messagingService) {
  return messagingService.getToken({
    vapidKey: "BKKqFoBjWi-Bg7pQF7y4W0kFQ-BB62o6Oo_ANzB8Lk8S1q_LH9U5V7DDSR4pRVeV84PQKllSw-WrP4f1G-F8tVE",
    // vapidKey: "BHBlnK74Khi05gWPlHi1gxzOaP69CAj7zZh_P20h_ik7aMyJrfIEKwulsCgEsqbFZq_Q13ePDNViuMVJRGlRBBk",
  });
}

// Base URL for server communication
const BASE_URL = "https://api.sandpod.ir/srv/notif-sandbox";

// Listen for background messages from Firebase
messaging.onBackgroundMessage(async (payload) => {
  try {
    // Get current registration token
    const token = await subscribe(messaging);
    // Display notification with payload data
    self.registration.showNotification(payload.data.title, {
      icon: payload.data.icon,
      image: payload.data.image,
      dir: payload.data.dir,
      requireInteraction: !!payload.data.requireInteraction,
      actions: [{
        action: "close", title: "بستن",
      }],
    });

    self.addEventListener("message", (event) => {
      if (event.data.action === "skipWaiting") {
        self.skipWaiting();
      }
    });

    // Notify server that push notification was received
    fetch(`${BASE_URL}/push/device/status`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status: "PUSH_RECEIVED",
        messageId: payload.data.messageId,
        registrationToken: token,
        data: [],
      }),
    });

    // Handle notification click events
    self.addEventListener("notificationclick", async (event) => {
      event.notification.close(); // Close the clicked notification

      // Update server based on the action taken
      const statusUpdate = event.action === "close" ? "PUSH_DISMISSED" : "PUSH_SEEN";
      fetch(`${BASE_URL}/push/device/status`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: statusUpdate,
          messageId: payload.data.messageId,
          registrationToken: token,
          data: [],
        }),
      });

      // Open a relevant page based on the notification data
      const urlToOpen = payload.data.link ? new URL(payload.data.link).href
        : new URL(self.location.origin).href;
      const promiseChain = clients.openWindow(urlToOpen);
      event.waitUntil(promiseChain);
    });
  } catch (error) {
    console.error(error); // Log any errors
  }
});
