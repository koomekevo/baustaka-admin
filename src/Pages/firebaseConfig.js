// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA9okcuaDZQIEfp3TrAIFyK75_lOhiO8gM",
  authDomain: "baustaka-89295.firebaseapp.com",
  databaseURL: "https://baustaka-89295-default-rtdb.firebaseio.com",
  projectId: "baustaka-89295",
  storageBucket: "baustaka-89295.firebasestorage.app",
  messagingSenderId: "708089267933",
  appId: "1:708089267933:web:457d61a9a1662a31d67d34",
  measurementId: "G-EELEP23SDD"
};

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
export const auth = getAuth(app);
