
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCUKxwcu9iluWHjZ2akyKqFn9l-R2lqhBQ",
    authDomain: "delishare-react-project.firebaseapp.com",
    projectId: "delishare-react-project",
    storageBucket: "delishare-react-project.appspot.com",
    messagingSenderId: "176057497234"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);