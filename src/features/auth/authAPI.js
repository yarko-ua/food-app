import firebase from 'firebase/app';
import 'firebase/auth';
import { fbApp, fbdb } from '../app/fileUploader/fileUploaderAPI';

export const signIn = (email, password) => 
  firebase.auth(fbApp)
    .signInWithEmailAndPassword(email, password)
    .then( ({ user }) => {
      console.log('user', user)

      // console.log(`user.getToken()`, user.getToken())

      const { uid, displayName, email, photoURL } = user

      return { uid, displayName, email, photoURL }
    })


export const signUp = async (email, password, displayName, photoURL = null) => {
  const userCredential = await firebase.auth(fbApp)
    .createUserWithEmailAndPassword(email, password)

  console.log(`userCredential`, userCredential)

  const { user } = userCredential

  console.log('user', user);

  const userOptions = {
    displayName,
  }

  await user.updateProfile(userOptions)

      // console.log(`user.getToken()`, user.getToken());

  const { uid } = user

  const userRef = fbdb.collection('users').doc(uid)

  await userRef.set({
        name: displayName,
        avatar: photoURL,
        email,
      })

  const createdAt = firebase.firestore.FieldValue.serverTimestamp()

  const userFirstList = await userRef
    .collection('lists')
    .add({
      name: 'My First List',
      createdAt,
      products: [
        {
          id: 'defaultProduct',
          description: 'Lorem ipsum..',
          name: 'My first product',
          thumb : null,
        }
      ]
    })

  console.log(`userFirstList`, userFirstList)

  return { uid, displayName, photoURL }
}


export const signOut = () => firebase.auth(fbApp).signOut()
