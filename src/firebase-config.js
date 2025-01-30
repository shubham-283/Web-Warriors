// Import the functions you need from the Firebase SDKs
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // For Firestore
import { getDatabase, ref, get } from "firebase/database"; // For Realtime Database

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCtRyKtAAMIOdKeYcVYC3zjox9pqJgbtas",
  authDomain: "adaajaipur-8ec99.firebaseapp.com",
  projectId: "adaajaipur-8ec99",
  storageBucket: "adaajaipur-8ec99.appspot.com",
  messagingSenderId: "680970962694",
  appId: "1:680970962694:web:77e508428e2c514bffc087",
  measurementId: "G-3N075WSGEX",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
console.log("Firebase connected");

// Initialize Firestore and Realtime Database
const db = getFirestore(app);  // Firestore instance
const realdb = getDatabase(app); // Realtime Database instance

export { db, realdb, ref, get };
