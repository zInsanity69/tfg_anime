// src/config/firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDz-NoDWxoATPgsxTKpMLWLn6r-fkRGtJo",
  authDomain: "marmimangas.firebaseapp.com",
  projectId: "marmimangas",
  storageBucket: "marmimangas.firebasestorage.app",
  messagingSenderId: "1096989263335",
  appId: "1:1096989263335:web:7edd7970262a6ed6f2e942",
  measurementId: "G-FHZ0TB99N6",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
