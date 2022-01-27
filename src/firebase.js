// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
import {getAnalytics} from "firebase/analytics";
import {getAuth, GoogleAuthProvider} from "firebase/auth";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB7eIr4XQEhtOZhV8LQhN7kbi7IzpDUg2s",
  authDomain: "mhealth-cedd0.firebaseapp.com",
  projectId: "mhealth-cedd0",
  storageBucket: "mhealth-cedd0.appspot.com",
  messagingSenderId: "914900465843",
  appId: "1:914900465843:web:eb2e7c9b8d5678768518c6",
  measurementId: "G-QVZ1VCMZB3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();
const provider = new GoogleAuthProvider();

export {auth, provider, analytics};
