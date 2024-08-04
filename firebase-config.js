// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage} from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAyDwQZOXdaU6bH4K0SwIToaFTQ0XM9iak",
  authDomain: "pantry-tracker-ebbcf.firebaseapp.com",
  projectId: "pantry-tracker-ebbcf",
  storageBucket: "pantry-tracker-ebbcf.appspot.com",
  messagingSenderId: "419205627506",
  appId: "1:419205627506:web:c85e246704a914711c4ceb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)
export const db = getFirestore(app);