import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDDXKmEcsazLz5tUMrK5BV4KVjmz7PPva4",
    authDomain: "charity-world-map.firebaseapp.com",
    projectId: "charity-world-map",
    storageBucket: "charity-world-map.appspot.com",
    messagingSenderId: "732326362074",
    appId: "1:732326362074:web:2d3e0e137285676b329ee3",
    measurementId: "G-S6KMJ1LDJM"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);