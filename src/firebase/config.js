import firebase from "firebase";

var firebaseConfig = {
  apiKey: "AIzaSyDHKGhHjlBkjBO5Bn22KPDJdZrMnMa5Je4",
  authDomain: "realtime-chat-7e880.firebaseapp.com",
  projectId: "realtime-chat-7e880",
  storageBucket: "realtime-chat-7e880.appspot.com",
  messagingSenderId: "738914441028",
  appId: "1:738914441028:web:e1267962c800cdc609a911",
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();

export { auth, db };
