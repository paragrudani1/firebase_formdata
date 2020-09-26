/** @format */

import firebase from "firebase";

var firebaseConfig = {
  apiKey: "AIzaSyDh9qnDEblec8CTJ5JpgB-7Uh_ll0aMmqE",
  authDomain: "orbital-view.firebaseapp.com",
  databaseURL: "https://orbital-view.firebaseio.com",
  projectId: "orbital-view",
  storageBucket: "orbital-view.appspot.com",
  messagingSenderId: "737596766785",
  appId: "1:737596766785:web:c2bed732085310eaf7a4c0",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();

export default firebase;
