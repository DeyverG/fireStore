import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://support.google.com/firebase/answer/7015592
const environment = import.meta.env;
const firebaseConfig = {
    apiKey: environment.VITE_APIKEY,
    authDomain: environment.VITE_AUTHDOMAIN,
    projectId: environment.VITE_PROJECTID,
    storageBucket: environment.VITE_STORAGEBUCKET,
    messagingSenderId: environment.VITE_MESSAGINGSENDERID,
    appId: environment.VITE_APPID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);