// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estates-bbff8.firebaseapp.com",
  projectId: "mern-estates-bbff8",
  storageBucket: "mern-estates-bbff8.appspot.com",
  messagingSenderId: "417600794285",
  appId: "1:417600794285:web:4f072fcfc34c70d713e024"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);