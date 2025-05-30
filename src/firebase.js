// src/firebase.js
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";
// Your web app's Firebase configuration
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