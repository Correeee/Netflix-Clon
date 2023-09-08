import { initializeApp } from "firebase/app";
import { getAuth } from "@firebase/auth";
import { getFirestore } from "@firebase/firestore";
import { getStorage } from "@firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyCJ0SSZRfKFOHVLUkR1JuTe1KY-qvx1LXA",
    authDomain: "netflix-clon-a8cd6.firebaseapp.com",
    projectId: "netflix-clon-a8cd6",
    storageBucket: "netflix-clon-a8cd6.appspot.com",
    messagingSenderId: "488493708251",
    appId: "1:488493708251:web:59ab8863799a4e3c416dfe"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app, 'gs://netflix-clon-a8cd6.appspot.com')
