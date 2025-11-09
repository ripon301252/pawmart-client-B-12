// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDz7862c-i1-CE9FLTDN3LHlaRa9m-Bkcg",
  authDomain: "pawmart-f5e49.firebaseapp.com",
  projectId: "pawmart-f5e49",
  storageBucket: "pawmart-f5e49.firebasestorage.app",
  messagingSenderId: "1051740213515",
  appId: "1:1051740213515:web:2c5beb11286a0b7b75520e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);