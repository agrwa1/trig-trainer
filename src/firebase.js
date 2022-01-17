import dotenv from 'dotenv';
import { initializeApp } from 'firebase/app';

// auth
import { getAuth } from 'firebase/auth';
import 'firebase/auth';

// firestore
import { getFirestore } from 'firebase/firestore';
import 'firebase/firestore';

// initialize app
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

const auth = getAuth();
const db = getFirestore();
export { auth, db };
