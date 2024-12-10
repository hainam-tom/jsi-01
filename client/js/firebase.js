import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-database.js";

// Your Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAIchh1_Na2puX0aNCZfa-oVnT09WMh1NI",
    authDomain: "jsi-30.firebaseapp.com",
    databaseURL: "https://jsi-30-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "jsi-30",
    storageBucket: "jsi-30.appspot.com",
    messagingSenderId: "713987376109",
    appId: "1:713987376109:web:0605861e04ae7107259de4",
    measurementId: "G-S5WSY0MN52",
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize services
export const auth = getAuth(app);
export const database = getDatabase(app);