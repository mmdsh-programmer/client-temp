// eslint-disable-next-line import/no-extraneous-dependencies
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCd77oDdFact3bgoyixxfQTa8wWiJxMrVY",
  authDomain: "podnotification-88758.firebaseapp.com",
  databaseURL: "https://podnotification-88758-default-rtdb.firebaseio.com",
  projectId: "podnotification-88758",
  storageBucket: "podnotification-88758.appspot.com",
  messagingSenderId: "309762851928",
  appId: "1:309762851928:web:3bfb65cb74e353b553362d",
  measurementId: "G-D325BCEYEB",
};

// Initialize Firebase
export const firebaseInstance = initializeApp(firebaseConfig);
