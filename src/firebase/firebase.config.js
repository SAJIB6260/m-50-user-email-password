// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAo_L3vAluzaPybYpuyySkdpUqzm5MZE2Y",
  authDomain: "user-email-password-auth-82b32.firebaseapp.com",
  projectId: "user-email-password-auth-82b32",
  storageBucket: "user-email-password-auth-82b32.appspot.com",
  messagingSenderId: "563264971726",
  appId: "1:563264971726:web:c28a317541fe569968419f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

export default auth;