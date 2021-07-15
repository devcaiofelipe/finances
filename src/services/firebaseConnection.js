import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

let firebaseConfig = {
    apiKey: "AIzaSyBn9m6rwIZBXidRf27G4CwJqMsJtlv4H-w",
    authDomain: "meuapp-653d8.firebaseapp.com",
    databaseURL: "https://meuapp-653d8-default-rtdb.firebaseio.com",
    projectId: "meuapp-653d8",
    storageBucket: "meuapp-653d8.appspot.com",
    messagingSenderId: "30851135479",
    appId: "1:30851135479:web:3c8fde7a68aa6e0a2da0f2",
    measurementId: "G-FD6WFT0N60"
};

if(!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
};

export default firebase;