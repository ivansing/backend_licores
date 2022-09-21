import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAl7c5NPkhGDfHO3SxM490yVQf6PlqVXAY",
  authDomain: "ecommerce-flutter-e9282.firebaseapp.com",
  projectId: "ecommerce-flutter-e9282",
  storageBucket: "ecommerce-flutter-e9282.appspot.com",
  messagingSenderId: "470843053445",
  appId: "1:470843053445:web:1fba22a97a4a150969a0ec",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
