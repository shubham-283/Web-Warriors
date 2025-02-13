// Import the functions you need from the Firebase SDKs
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // Firestore
import { getDatabase, ref, get } from "firebase/database"; // Realtime Database

// Firebase configuration using environment variables
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API,
  authDomain: process.env.REACT_APP_FIREBASE_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECTID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
  databaseURL: `https://${process.env.REACT_APP_FIREBASE_PROJECTID}.firebaseio.com/`, // ✅ Required for Realtime Database
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
console.log("✅ Firebase connected successfully!");

// Initialize Firestore and Realtime Database
const db = getFirestore(app); // Firestore instance
const realdb = getDatabase(app); // Realtime Database instance

// Export instances for use in other components
export { db, realdb, ref, get };
