// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBBKAUsWy4aFt4OoBk3fnWaX2Anq3zzQ3Y",
  authDomain: "instagram-8662a.firebaseapp.com",
  projectId: "instagram-8662a",
  storageBucket: "instagram-8662a.firebasestorage.app",
  messagingSenderId: "986795581474",
  appId: "1:986795581474:web:e8ff8d1f73fab794056a7b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export const auth = getAuth(app);