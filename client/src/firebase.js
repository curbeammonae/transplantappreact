// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey:  import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "transplantaut.firebaseapp.com",
  projectId: "transplantaut",
  storageBucket: "transplantaut.appspot.com",
  messagingSenderId: "348490774506",
  appId: "1:348490774506:web:3a7c9d7310bccc1cc3e493"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);