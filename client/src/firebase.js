import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-12f52.firebaseapp.com",
  projectId: "mern-blog-12f52",
  storageBucket: "mern-blog-12f52.appspot.com",
  messagingSenderId: "526147694104",
  appId: "1:526147694104:web:defd2d6c34f28b382f5d6d",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
