// // import firebase from 'firebase/compat/app';
// // import 'firebase/compat/auth';
// // import 'firebase/compat/firestore';
// // const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');

// // import { getFirestore, collection, query } from 'firebase/firestore';
// import firebase from 'firebase';

// import 'firebase/firestore';
import dotenv from 'dotenv';
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import 'firebase/auth';
dotenv.config();

const app = initializeApp({
	apiKey: process.env.REACT_APP_FIREBASE_CONFIG_API_KEY,
	authDomain: process.env.REACT_APP_FIREBASE_CONFIG_AUTH_DOMAIN,
	databaseUrl: process.env.REACT_APP_FIREBASE_CONFIG_DATABASE_URL,
	projectId: process.env.REACT_APP_FIREBASE_CONFIG_PROJECT_ID,
	storageBucket: process.env.REACT_APP_FIREBASE_CONFIG_STORAGE_BUCKET,
	messagingSenderId:
		process.env.REACT_APP_FIREBASE_CONFIG_MESSAGING_SENDER_ID,
	appId: process.env.REACT_APP_FIREBASE_CONFIG_APP_ID,
	measurementId: process.env.REACT_APP_FIREBASE_CONFIG_MEASUREMENT_ID,
});

// // console.log(firebaseApp);

const auth = getAuth();
export { auth };
// const firestore = firebase.firestore();
