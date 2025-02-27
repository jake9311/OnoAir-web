// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const environment = {
  

 firebaseConfig : {
  apiKey: "AIzaSyB6PWFPsb-A5Er4V6Xq0aSn34nE90Gadto",
  authDomain: "ono-air-project.firebaseapp.com",
  projectId: "ono-air-project",
  storageBucket: "ono-air-project.firebasestorage.app",
  messagingSenderId: "61298600049",
  appId: "1:61298600049:web:568a72244c1327944613d0",
  measurementId: "G-V2Y449YR29"
}};

// Initialize Firebase
const app = initializeApp(environment.firebaseConfig);
const analytics = getAnalytics(app);
