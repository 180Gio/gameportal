import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyCuUwL5yExS2QEingiiGSULY1U_5TPNYvo",
    authDomain: "gameportal-saw.firebaseapp.com",
    projectId: "gameportal-saw",
    storageBucket: "gameportal-saw.firebasestorage.app",
    messagingSenderId: "832534611754",
    appId: "1:832534611754:web:5bbfea21fd70a66d028053",
    measurementId: "G-WF03LSQ1X2"
};

const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const auth = getAuth(app);

export { app, auth };