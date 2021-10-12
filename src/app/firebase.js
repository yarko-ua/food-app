// import firebase from 'firebase/app';
// import 'firebase/auth'
// import 'firebase/storage';
// import 'firebase/firestore';

// export const firebaseConfig = {
//   apiKey: "AIzaSyAKyCbd0mkg2U0_I4LU9TqejHVELNgCjn0",
//   authDomain: "food-app-a7050.firebaseapp.com",
//   projectId: "food-app-a7050",
//   storageBucket: "food-app-a7050.appspot.com",
//   messagingSenderId: "926679143675",
//   appId: "1:926679143675:web:839da0610d4ec24651cc5e"
// };
// // Initialize Firebase
// const fbApp = firebase.initializeApp(firebaseConfig);

// // export const auth = firebase.auth(fbApp)

// export const fbStorage = firebase.storage();

// export const fbdb = firebase.firestore();

// export const fbStorageRef = fbStorage.ref();

// // console.log(`fbStorageRef`, fbStorageRef)

// export const imagesRef = fbStorageRef.child('images');

// export const productsStorage = fbStorage.ref('products')
// export const listsStorage = fbStorage.ref('lists')

// export const usersStorage = fbStorage.ref('users')
// export const userPubStorage = uid => usersStorage.child(`${uid}/public`)
// export const userPrivStorage = uid => usersStorage.child(`${uid}/private`)
// export const userPrivStorPath = (uid, path) => userPrivStorage(uid).child(path)
// export const userPubStorPath = (uid, path) => userPrivStorage(uid).child(path)


// export const fbStorageConfig = {
//   fbStorageRef,
//   imagesRef,
//   usersStorage,

//   userPubStorage,
//   userPrivStorage
// }

// // window.fire = firebase

// // console.log(`fbStorageConfig`, fbStorageConfig)

// // console.log(`imagesRef`, imagesRef)
// // console.log(`productsStorage`, productsStorage)
// // console.log(`userPubStorage`, userPubStorage)
// // console.log(`userPrivStorage`, userPrivStorPath)
// // console.log(`listsStorage`, listsStorage)
// // console.log(`usersStorage`, usersStorage)


// export default fbApp

