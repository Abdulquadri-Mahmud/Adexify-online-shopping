// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "adexify-75470.firebaseapp.com",
  projectId: "adexify-75470",
  storageBucket: "adexify-75470.appspot.com",
  messagingSenderId: "607408229219",
  appId: "1:607408229219:web:d90784a9aa8dbd1c242156"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);