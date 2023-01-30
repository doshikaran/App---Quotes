import { initializeApp } from "firebase/app";
import {getAuth, } from 'firebase/auth'
const firebaseConfig = {
  apiKey: "",
  authDomain: "quote-42bc0.firebaseapp.com",
  projectId: "quote-42bc0",
  storageBucket: "quote-42bc0.appspot.com",
  messagingSenderId: "",
  appId: "",
  measurementId: ""
};

const app = initializeApp(firebaseConfig);
export const authentication = getAuth(app)