import { db } from '../firebase';
import {
	collection,
	addDoc,
	doc,
	getDoc,
	query,
	where,
	getDocs,
} from 'firebase/firestore';

export const firebaseProblemWrong = async (problem, email) => {
	try {
		const docRef = await addDoc(collection(db, 'problems'), {
			answeredAt: new Date(),
			correct: false,
			name: problem.name,
			quadrant: problem.quadrant,
			type: problem.type,
			email: email,
			// user: (1. get user reference from users collection) (2. add user reference)
		});
	} catch (e) {
		console.log('Error adding problem: ', e);
	}
};

export const firebaseProblemCorrect = async (problem, email) => {
	try {
		const docRef = await addDoc(collection(db, 'problems'), {
			answeredAt: new Date(),
			correct: true,
			name: problem.name,
			quadrant: problem.quadrant,
			type: problem.type,
			email: email,
			// user: (1. get user reference from users collection) (2. add user reference)
		});
	} catch (e) {
		console.log('Error adding problem: ', e);
	}
};

export const firebaseCreateBasicUser = async (user) => {
	// create user with initial details
	try {
		const docRef = await addDoc(collection(db, 'users'), {
			createdAt: new Date(),
			email: user.email,
			name: user.name,
			photo_url: user.photo_url,
			classes: [],
			achievements: ['achievements/VbtPmk3eWtHMxVMSz8hA'], // created account achievement,
			account_type: 'student', // creates default student type account
		});
	} catch (e) {
		console.log('Error adding user: ', e);
	}
};

export const firebaseCreateTeacherUser = async (user) => {
	// find user
	// update with new info
};

export const firebaseFindUserExistsByEmail = (email) => {
	// search for user
	const userRef = db.collection('users');
	const queryRef = userRef.where('email', '==', email).get();
	// if user doesn't exists, return false
	if (queryRef.empty) {
		return false; // user doesn't exist
	} else {
		// else return true
		return queryRef[0]; // returns the first and only element in queryRef
	}
};

// get userid by email
export const firebaseFindUserByEmail = (email) => {
	// find user by email
	return email;
};

export const firebaseGetStudentInfo = async (email) => {
	try {
		const q = query(collection(db, 'users'), where('email', '==', email));
		const querySnapshot = await getDocs(q);

		// setting doc
		const docArray = [];
		querySnapshot.forEach((doc) => {
			docArray.push(doc);
		});
		const doc = docArray[0];
		return doc.data();
	} catch (e) {
		console.log(`Failed to get user infomation: ${e}`);
	}
};

// make these into one function to save on costs
export const firebaseGetStudentProblems = async (email) => {
	try {
		// get all problems WHERE email == email
		const q = query(
			collection(db, 'problems'),
			where('email', '==', email)
			// where('correct', '==', true)
		);

		const querySnapshot = await getDocs(q);
		const docArray = [];
		querySnapshot.forEach((doc) => {
			// console.log(`${doc.id} => ${doc.data}`);
			docArray.push(doc.data);
		});
		return docArray.length;
	} catch (e) {
		console.log('failed to get problems: ', e);
	}
};

export const firebaseGetStudentCorrectProblems = async (email) => {
	try {
		// get all problems WHERE email == email and WHERE correct == true
		const q = query(
			collection(db, 'problems'),
			where('email', '==', email),
			where('correct', '==', true)
		);

		const querySnapshot = await getDocs(q);
		const docArray = [];
		querySnapshot.forEach((doc) => {
			// console.log(`${doc.id} => ${doc.data}`);
			docArray.push(doc.data);
		});
		return docArray.length;
	} catch (e) {
		console.log('failed to get problems: ', e);
	}
};

export const firebaseGetStudentWrongProblems = async (email) => {
	try {
		// get all problems WHERE email == email and WHERE correct == false
		const q = query(
			collection(db, 'problems'),
			where('email', '==', email),
			where('correct', '==', false)
		);

		const querySnapshot = await getDocs(q);
		const docArray = [];
		querySnapshot.forEach((doc) => {
			// console.log(`${doc.id} => ${doc.data}`);
			docArray.push(doc.data);
		});
		return docArray.length;
	} catch (e) {
		console.log('failed to get problems: ', e);
	}
};

// const firebaseAddStudentToClass
//      - find student user
//      - add class id to student
//      - find class by class id
//      - add student to class

// const firebaseGetClassInfo
//      - find class id
//      - if teacher of class is logged in,
//      - return class id to render for teacher to see
