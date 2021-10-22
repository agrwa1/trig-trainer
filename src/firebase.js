import dotenv from 'dotenv';
import firebase from 'firebase/compat/app';
import { initializeApp } from 'firebase/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, collection, query } from 'firebase/firestore';
dotenv.config();

const firebaseApp = initializeApp({
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

// console.log(firebaseApp);

const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);

export { auth, db, firebaseApp };
