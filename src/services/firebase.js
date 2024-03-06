import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDKpgh4ie8kYztxdCpVDJIcEVsgOqKcNeM",
  authDomain: "sharpener-project-3.firebaseapp.com",
  databaseURL: "https://sharpener-project-3-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "sharpener-project-3",
  storageBucket: "sharpener-project-3.appspot.com",
  messagingSenderId: "260379905545",
  appId: "1:260379905545:web:06f76d241eb63d8e86b2d8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app)

export default auth;