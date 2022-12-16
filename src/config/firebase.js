// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyACR65_IO4GHdX8R0nw4pGNLKnwmkk_7Xc",
  authDomain: "stocknitro-f681f.firebaseapp.com",
  projectId: "stocknitro-f681f",
  storageBucket: "stocknitro-f681f.appspot.com",
  messagingSenderId: "909909306685",
  appId: "1:909909306685:web:c14b5998e8b64dfabce954"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app