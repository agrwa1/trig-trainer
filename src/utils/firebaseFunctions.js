import { db } from '../firebase';
import {
	collection,
	addDoc,
	doc,
	getDoc,
	query,
	where,
	getDocs,
	setDoc,
} from 'firebase/firestore';
import { generateCode } from './generateCode';

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
		// using setDoc b/c addDoc doesn't let you change doc id
		const userRef = doc(db, 'users', user.email);
		await setDoc(userRef, {
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

export const firebaseFindUserExistsByEmail = async (email) => {
	// search for user
	// if user doesn't exists, return false
	try {
		const docRef = doc(db, 'users', email);
		const docSnap = await getDoc(docRef);
		if (docSnap.exists()) {
			return true;
		}
		return false;
	} catch (e) {
		throw e;
	}
};

export const firebaseGetStudentInfo = async (email) => {
	try {
		const docRef = doc(db, 'users', email); // finds doc in "users" "db" where id = email
		const docSnap = await getDoc(docRef);
		if (!docSnap.exists()) {
			// when user with email does not exist
			return {};
		}
		return docSnap.data();
	} catch (e) {
		throw e;
	}
};

export const firebaseGetUserIsTeacher = async (email) => {
	try {
		const docRef = doc(db, 'users', email);
		const docSnap = await getDoc(docRef);
		if (docSnap.data().account_type !== 'teacher') return false;
		return true;
	} catch (e) {
		console.log(`Error getting information: ${e}`);
	}
};

export const firebaseGetTeacherInfo = async (email) => {
	try {
		const docRef = doc(db, 'users', email); // finds doc in "users" "db" where id = email
		const docSnap = await getDoc(docRef);
		if (!docSnap.exists()) {
			// when user with email does not exist
			return {};
		}
		if (docSnap.data().account_type !== 'teacher')
			return 'User is not a teacher';
		return docSnap.data();
	} catch (e) {
		throw e;
	}
};

export const firebaseGetStudentProblems = async (email) => {
	// for future: make this use numbers and not arrays
	try {
		// get all problems WHERE email == email
		const q = query(
			collection(db, 'problems'),
			where('email', '==', email)
			// where('correct', '==', true)
		);

		const querySnapshot = await getDocs(q);
		const docArray = [];
		const numCorrect = [];
		const numWrong = [];
		querySnapshot.forEach((doc) => {
			const data = doc.data();
			if (data.correct) {
				// when question is correct
				numCorrect.push(data);
			} else {
				// when question is wrong
				numWrong.push(data);
			}
			// adds it to total regardless
			docArray.push(data);
		});
		// return array that contains amount of questions total, correct, and wrong in that order
		return [docArray.length, numCorrect.length, numWrong.length];
	} catch (e) {
		console.log('failed to get problems: ', e);
	}
};

export const firebaseAddStudentToClass = async (
	email,
	classCode,
	currentClasses
) => {
	//      - find student user
	//      - add class id to student
	//      - find class by class id
	//      - add student to class
	try {
		const userRef = doc(db, 'users', email);
		await setDoc(
			userRef,
			{
				classes: [...currentClasses, classCode],
			},
			{ merge: true }
		);

		const classRef = doc(db, 'classes', classCode);
		const classData = await firebaseGetClassInfo(classCode);
		const studentArr = classData.students;
		await setDoc(
			classRef,
			{
				students: [...studentArr, email],
			},
			{ merge: true }
		);
	} catch (e) {
		console.log(`Error adding student to class: ${e}`);
	}
};

// const firebaseGetClassInfo
//      - find class id
//      - if teacher of class is logged in,
//      - return class id to render for teacher to see

//      - search using query that has name == class name and teacher == teacher name

export const firebaseGetClassInfo = async (code) => {
	try {
		const docRef = doc(db, 'classes', code); // finds doc in "users" "db" where id = email
		const docSnap = await getDoc(docRef);
		if (!docSnap.exists()) {
			// when class doesn't exist
			return {};
		}
		// returns class names, and students
		return docSnap.data();
	} catch (e) {
		throw e;
	}
};

// create clas
// - generate random 6 digit hexadecimal
// - check if code exists, if no, return
// - if yes, repeat
export const firebaseCreateClass = async (
	teacherEmail,
	className,
	currentClasses
) => {
	// creates 6digit hexadecimal code
	let code = generateCode();

	try {
		// find classes with same code
		let docRef = doc(db, 'users', code);
		let docSnap = await getDoc(docRef);
		while (docSnap.exists()) {
			// if class code has already been created
			// creates unique code
			let code = generateCode();

			// find classes with same code
			docRef = doc(db, 'users', code);
			docSnap = await getDoc(docRef);
		}

		// create class
		const classRef = doc(db, 'classes', code);
		await setDoc(classRef, {
			join_code: code,
			name: className,
			teacher: teacherEmail,
			students: [],
			createdAt: new Date(),
		});

		// add class to teacher profile
		const teacherRef = doc(db, 'users', teacherEmail); // gets teacher reference
		await setDoc(
			teacherRef,
			{
				classes: [...currentClasses, code],
			},
			{ merge: true }
		);
	} catch (e) {
		console.log(`Error creating class: ${e}`);
	}
};
