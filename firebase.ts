// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBebZoFPKhOWgW-tCl25gNi-BMv0-rYRxY",
    authDomain: "stock-savant.firebaseapp.com",
    projectId: "stock-savant",
    storageBucket: "stock-savant.appspot.com",
    messagingSenderId: "828313915413",
    appId: "1:828313915413:web:483906a95523d4290e7e1c",
    measurementId: "G-27RCSS7XZ6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
