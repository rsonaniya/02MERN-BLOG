import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-67ce9.firebaseapp.com",
  projectId: "mern-blog-67ce9",
  storageBucket: "mern-blog-67ce9.appspot.com",
  messagingSenderId: "482465071252",
  appId: "1:482465071252:web:646ee4e13970016ac03481",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
