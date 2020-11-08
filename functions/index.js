const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

exports.onUserStatusChange = functions.database
  .ref("/status/{userId}")
  .onUpdate((event, context) => {
    var db = admin.firestore();
    var fieldValue = admin.firestore.FieldValue;

    const usersRef = db.collection("users");
    var snapShot = event.after;

    return event.after.ref
      .once("value")
      .then((statusSnap) => snapShot.val())
      .then((status) => {
        if (status === "offline") {
          usersRef.doc(context.params.userId).update({
            active: false,
            lastSeen: fieldValue.serverTimestamp(),
          });
        }
        return null;
      });
  });
