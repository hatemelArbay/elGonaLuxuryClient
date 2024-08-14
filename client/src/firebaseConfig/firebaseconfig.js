// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getStorage} from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDGcFHO3z7VQt6kLwa56Wpa5UptcIMGi80",
  authDomain: "elgonaluxary.firebaseapp.com",
  projectId: "elgonaluxary",
  storageBucket: "elgonaluxary.appspot.com",
  messagingSenderId: "111836370594",
  appId: "1:111836370594:web:7ea4304b6cc1c6d3bbe9fb",
  measurementId: "G-8KDNS7YCM1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const storage=getStorage(app);