import firebase from 'firebase/app';
import 'firebase/auth';
import { fbApp, fbdb } from '../app/fileUploader/fileUploaderAPI';

export const signIn = async (uemail, password) => {
  try {
    const userCredentials = await firebase.auth(fbApp)
    .signInWithEmailAndPassword(uemail, password)

    const { user } = userCredentials

    console.log('user', user)
    // console.log(`user.getToken()`, user.getToken())
    const { uid, displayName, email, photoURL } = user

    return { uid, displayName, email, photoURL }
  } catch (error) {
      console.log(`SignIn error`, error)

      console.log(`error.code`, error.code)

      throw new Error(error.message)
  }
  
}

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
    })

  console.log(`userFirstList`, userFirstList)

  const productsRef = userFirstList.collection('products')
  const firstProductInList = await productsRef.doc('defaultProduct').set({
  
    id: 'defaultProduct',
    description: 'Lorem ipsum..',
    name: 'My first product',
    thumb : null,
  
  })

  console.log(`firstProductInList`, firstProductInList)

  return { uid, displayName, photoURL }
}


export const signOut = () => firebase.auth(fbApp).signOut()
