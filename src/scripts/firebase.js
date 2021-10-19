// NPM package
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";
import { getAuth } from "firebase/auth";

// Using the Project fe-firebase-setup credentials
const firebaseConfiguration = {
  apiKey: "AIzaSyCg5AgfTsO8rtIQ5QyQ66RbuioeG0dcvuQ",
  authDomain: "fe-firebase-setup.firebaseapp.com",
  projectId: "fe-firebase-setup",
  storageBucket: "fe-firebase-setup.appspot.com",
  messagingSenderId: "466939589225",
  appId: "1:466939589225:web:02ac6c3e8770e9a000a8f8",
};

const firebaseInstance = initializeApp(firebaseConfiguration);

export const fireStoreInstance = getFirestore(firebaseInstance);
export const authInstance = getAuth(firebaseInstance);
