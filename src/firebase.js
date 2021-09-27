// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase";
// import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";
// import { getFirestore } from "firebase/firestore";
// import { GoogleAuthProvider } from "firebase/auth";



const firebaseConfig = {
    apiKey: "AIzaSyBpbWOMloIwZanPy7PAjIqU_RPNbH8CGjc",
    authDomain: "we-talk-ceb5e.firebaseapp.com",
    projectId: "we-talk-ceb5e",
    storageBucket: "we-talk-ceb5e.appspot.com",
    messagingSenderId: "269000198716",
    appId: "1:269000198716:web:933b513c4e967798fb5139",
    measurementId: "G-PE0S6EBQ8G"
  };


  const firebaseapp = firebase.initializeApp(firebaseConfig);

  const db = firebaseapp.firestore();
  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();

  // export these explicitly
  export {auth, provider, db};