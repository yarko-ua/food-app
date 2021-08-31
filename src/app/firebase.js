import firebase from 'firebase/app';
import 'firebase/auth'
import 'firebase/storage';
import 'firebase/firestore';

export const firebaseConfig = {
  apiKey: "AIzaSyAKyCbd0mkg2U0_I4LU9TqejHVELNgCjn0",
  authDomain: "food-app-a7050.firebaseapp.com",
  projectId: "food-app-a7050",
  storageBucket: "food-app-a7050.appspot.com",
  messagingSenderId: "926679143675",
  appId: "1:926679143675:web:839da0610d4ec24651cc5e"
};
// Initialize Firebase
const fbApp = firebase.initializeApp(firebaseConfig);

// export const auth = firebase.auth(fbApp)

export const fbStorage = firebase.storage();

export const fbdb = firebase.firestore();

export const fbStorageRef = fbStorage.ref();

export const imagesRef = fbStorageRef.child('images');

export default fbApp

