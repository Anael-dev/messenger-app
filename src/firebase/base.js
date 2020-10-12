import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCf3oYMryeQS13Q_YsR9fAl3taaPd8EA9Q",
  authDomain: "messenger-app-cce9f.firebaseapp.com",
  databaseURL: "https://messenger-app-cce9f.firebaseio.com",
  projectId: "messenger-app-cce9f",
  storageBucket: "messenger-app-cce9f.appspot.com",
  messagingSenderId: "986604618991",
  appId: "1:986604618991:web:47380cf34640ef70e1071a",
  measurementId: "G-9D9L33PFCE",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();

export { firebase, auth, db };
