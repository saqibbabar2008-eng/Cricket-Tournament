
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB9pgV8MTLPZtL8_IJHfMJ_ps3XW670SdI",
  authDomain: "cricket-tournament-c9c09.firebaseapp.com",
  projectId: "cricket-tournament-c9c09",
  storageBucket: "cricket-tournament-c9c09.firebasestorage.app",
  messagingSenderId: "843561700719",
  appId: "1:843561700719:web:0c93568a29a76c22922c9a",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
