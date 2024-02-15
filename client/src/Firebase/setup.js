import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyBn9qrmwmo4UXIrVUcasyn3VipHjE8zRUM",
  authDomain: "clone-ab80e.firebaseapp.com",
  projectId: "clone-ab80e",
  storageBucket: "clone-ab80e.appspot.com",
  messagingSenderId: "64453711106",
  appId: "1:64453711106:web:5388e257719b95e30e5e1b",
  measurementId: "G-3L9BK5ZSTN",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
