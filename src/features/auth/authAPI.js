import firebase from 'firebase/app';
import 'firebase/auth';
import { fbApp } from '../app/fileUploader/fileUploaderAPI';

export const signIn = (email, password) => 
  firebase.auth(fbApp)
    .signInWithEmailAndPassword(email, password)
    .then( ({ user }) => {
      console.log('user', user)

      // console.log(`user.getToken()`, user.getToken())

      const { uid, displayName, email, photoURL } = user

      return { uid, displayName, email, photoURL }
    })


export const signUp = (email, password) => 
  firebase.auth(fbApp)
    .createUserWithEmailAndPassword(email, password)
    .then( ({ user }) => {

      console.log('user', user);

      // console.log(`user.getToken()`, user.getToken());

      const { uid, displayName, email, photoURL } = user
      
      return { uid, displayName, email, photoURL }
    })


export const signOut = () => firebase.auth(fbApp).signOut()
