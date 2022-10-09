// firebase config key setup

import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import 'firebase/compat/storage'
import 'firebase/compat/database'

const firebaseConfig = {
    apiKey: "AIzaSyABDQUBAQzk22_F16hb6gnM_C7mfY1g9N8",
    authDomain: "ourworkout-33235.firebaseapp.com",
    projectId: "ourworkout-33235",
    storageBucket: "ourworkout-33235.appspot.com",
    messagingSenderId: "994798768707",
    appId: "1:994798768707:web:4a226a89b56a069d907af6",
    databaseURL: "https://ourworkout-33235-default-rtdb.asia-southeast1.firebasedatabase.app"
  };



let app
firebase.initializeApp(firebaseConfig)
// if (firebase.app.length == 0) {
//     app = firebase.initializeApp(firebaseConfig);
// } else {
//     app = firebase.app()
// }

export { firebase };