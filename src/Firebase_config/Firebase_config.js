import {initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from  "firebase/auth";
import {getStorage} from 'firebase/storage';
import {getFirestore} from 'firebase/firestore';


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAXgfD-y4f0i3UlGgCWNAus8RV3ZtQbVr4",
  authDomain: "myfirstproject-b3801.firebaseapp.com",
  projectId: "myfirstproject-b3801",
  storageBucket: "myfirstproject-b3801.appspot.com",
  messagingSenderId: "881091778820",
  appId: "1:881091778820:web:fcdda1bb2c6cb9bd481851"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth (app);
export const storage = getStorage(app);
export const db = getFirestore(app);
export const provider = new GoogleAuthProvider();
export default app;