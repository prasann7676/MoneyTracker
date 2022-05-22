import firebase from "firebase/app";
import 'firebase/firestore';
import 'firebase/auth';


// firebase config object, unique object recieved from firebase
// after creating a new project.
const firebaseConfig = {
    apiKey: "AIzaSyDEQrGr42fLczOkj77FJaFhyNQiAg1_yig",
    authDomain: "moneytracker-27468.firebaseapp.com",
    projectId: "moneytracker-27468",
    storageBucket: "moneytracker-27468.appspot.com",
    messagingSenderId: "456758553329",
    appId: "1:456758553329:web:1e413351bec4f4d8a7d750"
};

//initializing firebase (connecting with firebase)
firebase.initializeApp(firebaseConfig);

// initializing service
const projectFirestore = firebase.firestore();
// so that we could use functions like createUserWithEmailAndPassword and signout from the firebase
const projectAuth = firebase.auth();

// timestamp (used to keep track of the time when the document was created)
const timestamp = firebase.firestore.Timestamp

export { projectFirestore, projectAuth, timestamp }

