import firebase from 'firebase'
import 'firebase/auth'


var firebaseConfig = {
    apiKey: "AIzaSyCk3oQ05UHhAbXy4O5-WdIB_5veatiQ4Tg",
    authDomain: "task1-7b656.firebaseapp.com",
    projectId: "task1-7b656",
    storageBucket: "task1-7b656.appspot.com",
    messagingSenderId: "468933064501",
    appId: "1:468933064501:web:b810d685caa48044983e7c",
    measurementId: "G-P8N0N0D897"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export default firebase