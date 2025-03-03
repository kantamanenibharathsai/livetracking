// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import { getMessaging } from "firebase/messaging";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA4yvQBSeFL8s1hLubT6fpOQ-iTlENYyeM",
  authDomain: "fcm-demo-f4f60.firebaseapp.com",
  projectId: "fcm-demo-f4f60",
  storageBucket: "fcm-demo-f4f60.firebasestorage.app",
  messagingSenderId: "655981551018",
  appId: "1:655981551018:web:2a0812308c0c17df5c5fd3",
  measurementId: "G-LWX2T1VHSV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const messaging = getMessaging(app);