// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB_LemNHV5DksI03mT3NPwluzE7U7kQjXo",
  authDomain: "shopping-hub-4a19e.firebaseapp.com",
  projectId: "shopping-hub-4a19e",
  storageBucket: "shopping-hub-4a19e.firebasestorage.app",
  messagingSenderId: "347668383699",
  appId: "1:347668383699:web:9894cd6b54528ba7225126"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export default auth;

