import * as firebase from 'firebase';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyAi8u5bBKX4jAJd2CtCZ9jjLRt0JNZpC5E",
    authDomain: "practice-6f3f4.firebaseapp.com",
    projectId: "practice-6f3f4",
    storageBucket: "practice-6f3f4.appspot.com",
    messagingSenderId: "619122304729",
    appId: "1:619122304729:web:91ca8f7fcaf8e24e3880c8"
  };

if(!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}


export { firebase };