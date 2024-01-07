import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth , GoogleAuthProvider} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyB6JTHLzKLPN37Vdxik5vWP24d9JRcwpOc",
  authDomain: "fir-auth-135f2.firebaseapp.com",
  projectId: "fir-auth-135f2",
  storageBucket: "fir-auth-135f2.appspot.com",
  messagingSenderId: "457541582567",
  appId: "1:457541582567:web:992b2ec28154fcbf3b6c42",
  measurementId: "G-X6PFFTM58G"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const GoogleProvider = new GoogleAuthProvider()
export const db = getFirestore(app)