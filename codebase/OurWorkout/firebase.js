// Import the functions you need from the SDKs you need
import * as firebase from "firebase";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCSfUPEo9h76AIOHjNtWJ0l4txSLo-AXQU",
  authDomain: "ourworkout-a92ab.firebaseapp.com",
  projectId: "ourworkout-a92ab",
  storageBucket: "ourworkout-a92ab.appspot.com",
  messagingSenderId: "316155247830",
  appId: "1:316155247830:web:96d7d1a4d8f5c9bbe75d77"
};

// Initialize Firebase
let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app()
}

const auth = firebase.auth()

export { auth };