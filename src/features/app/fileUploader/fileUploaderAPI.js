import firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAKyCbd0mkg2U0_I4LU9TqejHVELNgCjn0",
  authDomain: "food-app-a7050.firebaseapp.com",
  projectId: "food-app-a7050",
  storageBucket: "food-app-a7050.appspot.com",
  messagingSenderId: "926679143675",
  appId: "1:926679143675:web:839da0610d4ec24651cc5e"
};
// Initialize Firebase
const fbApp = firebase.initializeApp(firebaseConfig);

const defaultFbAuth = firebase.auth(fbApp);

const user = defaultFbAuth.currentUser;

if (!user) {
  console.log('sing in');
  defaultFbAuth.signInWithEmailAndPassword('ssilvias13@gmail.com', 'Ukrcrimea_2019');
}

export const fbStorage = firebase.storage();

export const fbStorageRef = fbStorage.ref();

export const imagesRef = fbStorageRef.child('images');

