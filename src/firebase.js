// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth,GoogleAuthProvider} from 'firebase/auth';
import {getFirestore,doc,setDoc} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD65NcaWWNXEoBFh9LUrqogq58rkTFD0yA",
  authDomain: "financely-e92d1.firebaseapp.com",
  databaseURL: "https://financely-e92d1-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "financely-e92d1",
  storageBucket: "financely-e92d1.appspot.com",
  messagingSenderId: "682991269620",
  appId: "1:682991269620:web:5f894b7eb9dde740e0d0a1",
  measurementId: "G-1182VB12CR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db=getFirestore(app);
const auth=getAuth(app);
const provider=new GoogleAuthProvider();


export {db,auth,provider,doc,setDoc};