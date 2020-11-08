import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/database";

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

//exports
const db = firebase.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const realTimeDb = firebase.database();

const trackConnectionStatus = (userId) => {
  const usersRef = db.collection("users"); // Get a reference to the Users collection;
  const onlineRef = realTimeDb.ref(".info/connected"); // Get a reference to the list of connections

  onlineRef.on("value", (snapshot) => {
    realTimeDb
      .ref(`/status/${userId}`)
      .onDisconnect() // Set up the disconnect hook
      .set("offline") // The value to be set for this key when the client disconnects
      .then(() => {
        // Set the Firestore User's online status to true
        usersRef.doc(userId).set(
          {
            active: true,
          },
          { merge: true }
        );

        // Let's also create a key in our real-time database
        // The value is set to 'online'
        realTimeDb.ref(`/status/${userId}`).set("online");
      });
  });
};
const generateUserDocument = async (user, additionalData) => {
  if (!user) return;

  const userRef = db.collection("users").doc(user.uid);
  const userSnapshot = await userRef.get();
  if (userSnapshot.exists) {
    await userRef.update({
      active: true,
    });
  } else {
    console.log(additionalData);
    const { uid, displayName, photoURL } = user;
    try {
      await userRef.set({
        name: displayName || additionalData.name,
        uid,
        photo: photoURL || `https://avatars.dicebear.com/api/human/${uid}.svg`,
        active: true,
        // ...additionalData,
      });
    } catch (error) {
      console.log("Error creating user document", error);
    }
  }
  // const loggedUserData = await userRef.get();
  // return loggedUserData.data();

  return getUserDocument(user.uid);
};

const getUserDocument = async (uid) => {
  if (!uid) return null;
  try {
    const userDocument = await db.collection("users").doc(uid).get();
    return userDocument.data();
  } catch (error) {
    console.error("Error fetching user", error);
  }
};

export {
  firebase,
  auth,
  db,
  provider,
  generateUserDocument,
  trackConnectionStatus,
};
