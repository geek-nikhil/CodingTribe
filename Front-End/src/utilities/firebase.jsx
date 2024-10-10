// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBMM03w0Psq0d1Aqkr7lkjzbvcslrMBGdI",
  authDomain: "codetribe-643a1.firebaseapp.com",
  projectId: "codetribe-643a1",
  storageBucket: "codetribe-643a1.appspot.com",
  messagingSenderId: "1070880244714",
  appId: "1:1070880244714:web:f6af4ddde768c58b52a893",
  measurementId: "G-8LJKY1FBPF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);