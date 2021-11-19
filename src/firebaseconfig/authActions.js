import firebase from "firebase/app"
import "firebase/auth"
import fbApp, { fbdb } from "./firebase"

export const signIn = async (uemail, password) => {
	const userCredentials = await firebase
		.auth(fbApp)
		.signInWithEmailAndPassword(uemail, password)

	const { user } = userCredentials
	console.log("user", user)

	const { uid: id, displayName, email, photoURL } = user
	return { id, displayName, email, photoURL }
}

export const signUp = async (email, password, displayName) => {
	const userCredential = await firebase
		.auth(fbApp)
		.createUserWithEmailAndPassword(email, password)

	console.log(`userCredential`, userCredential)

	const { user } = userCredential

	console.log("user", user)

	await user.updateProfile({ displayName })

	const { uid } = user

	const userRef = fbdb.collection("users").doc(uid)

	await userRef.set({
		firstName: displayName,
		lastName: null,
		photoURL: null,
		email,
		address: null,
		friends: [],
	})

	const createdAt = firebase.firestore.FieldValue.serverTimestamp()

	const userFirstList = await userRef.collection("lists").add({
		name: "My First List",
		createdAt,
	})

	console.log(`userFirstList`, userFirstList)

	const productsRef = userFirstList.collection("products")
	const firstProductInList = await productsRef.doc("defaultProduct").set({
		id: "defaultProduct",
		description: "Lorem ipsum..",
		name: "My first product",
		thumb: null,
	})

	console.log(`firstProductInList`, firstProductInList)

	return { uid, displayName, email }
}

export const signOut = () => firebase.auth(fbApp).signOut()
