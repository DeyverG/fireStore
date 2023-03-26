import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://support.google.com/firebase/answer/7015592
const firebaseConfig = {
    apiKey: "AIzaSyBTvEHIr-faTZgax8LdeGd6iyRy6dSbM-w",
    authDomain: "firestore-prueba-8cab6.firebaseapp.com",
    projectId: "firestore-prueba-8cab6",
    storageBucket: "firestore-prueba-8cab6.appspot.com",
    messagingSenderId: "56738810793",
    appId: "1:56738810793:web:f3c787dc15cc4d4a3052b8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);