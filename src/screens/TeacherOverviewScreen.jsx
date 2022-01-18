import React, { useState, useEffect } from 'react';
import { Typography, Button, TextField, Card, CardContent, Switch } from '@material-ui/core';

import { Redirect, Link } from 'react-router-dom'
import { auth } from '../firebase'
import { useAuthState } from 'react-firebase-hooks/auth'

import { firebaseGetUserIsTeacher, firebaseGetTeacherInfo } from '../utils/firebaseFunctions'
import { firebaseCreateClass, firebaseGetClassInfo } from '../utils/firebaseFunctions'
import { firebaseGetStudentInfo, firebaseGetStudentProblems} from '../utils/firebaseFunctions'

// create individual class page and link each class to go there via props
const TeacherOverviewScreen = () => {
	const [userIsTeacher, setUserIsTeacher] = useState(false)
	const [user] = useAuthState(auth)

	useEffect(async () => {
        await getUserInfo()
        
    }, user)

    const getUserInfo = async () => {
        if (!auth.currentUser) return
        const email = auth.currentUser.email
        if (!email) return;
        setUserIsTeacher(await firebaseGetUserIsTeacher(email))
    }

	return (
        <div>
            { 
                (!auth.currentUser) &&
                <Redirect to="/signup" />
            }
            {
                (auth.currentUser && userIsTeacher) &&
				<Content />
            }

        </div>
        
	);
};

const Content = () => {
	// creating class error: FORM ERROR NOT FIREBASE ERROR, NAME IS NOT WORKING PROPERLY
	const [teacherData, setTeacherData] = useState({})
	const [className, setClassName] = useState(``)
	const [showComponent, setShowComponent] = useState(false)
	const [user] = useAuthState(auth)
	const [refresh, setRefresh] = useState(false)


	useEffect(async () => {
		setTeacherData(await firebaseGetTeacherInfo(auth.currentUser.email))
		setShowComponent(true)
	}, [user, refresh])

	
	const createNewClass = async() => {
		await firebaseCreateClass(auth.currentUser.email, className, teacherData.classes)
		setClassName('') 
		setRefresh(refresh ? false : true)
	}

	return (
		<div className="overview">
			<div className="container">
				<h1 className="overview-header">Teacher's Overview</h1>
				<div className="create-class" >

					<TextField variant="outlined" className='class-input' placeholder={`${teacherData.name}'s Class`} value={className} size="small" onChange={name => setClassName(name.target.value)}/>
					<Button variant="outlined" onClick={() => createNewClass()} >Create Class</Button>
				</div>				
				{
					showComponent &&
					<ClassesInformation classes={teacherData.classes}/>
				}
			</div>


		</div>
	)
}

function ClassesInformation({classes}) {
	// component gets list of all classes and has to render them
	return (
		<div>
			<hr></hr>
			{
				classes && 
				classes.map((classCode) => <ClassInfo classCode={classCode} />) // contains class code
			}
		</div>

	)
}

function ClassInfo({classCode}) {
	const [className, setClassName] = useState('')
	const [students, setStudents] = useState([])
	const [showClass, setShowClass] = useState(false)

	let classesData
	useEffect(async() => {
		classesData = await firebaseGetClassInfo(classCode) // gets all information from class code passed down
		setClassName(classesData.name) // sets class name
		setStudents(classesData.students) // sets all students array
		console.log(classesData.students)
	}, [])

	const onSwitch = () => {
		setShowClass(showClass ? false : true)
	}

	return (
		<div className={'classes-info'}>
			<h1 className="class-header">{className}</h1>
			<div className="subheader">
				<Switch value={showClass} onClick={onSwitch} style={{color: 'midnightblue'}}/>
				<p className="code">{classCode}</p>
			</div>
			
			<div className="students-list">
				{
					(students && showClass) &&
					students.map((studentEmail) => <StudentInfo studentEmail={studentEmail} style={{display: showClass ? 'grid' : 'none'}}/>)
				}
			</div>
		</div>
	)
}

function StudentInfo({studentEmail}) {
	const [studentProblems, setStudentProblems] = useState([])
	const [studentInfo, setStudentInfo] = useState({})
	useEffect(async () => {
		setStudentProblems(await firebaseGetStudentProblems(studentEmail))
		setStudentInfo(await firebaseGetStudentInfo(studentEmail))

	})

	return (
		<div className="student-card">
			<Card variant="outlined">
				<CardContent className="card-content">
					<Typography className="email" gutterBottom>{studentInfo.email}</Typography>
					<Typography variant="h5" className="name">{studentInfo.name}</Typography>
					<hr></hr>
					<Typography className="problem-count">Correct: {studentProblems[1]}</Typography>
					<Typography className="problem-count">Wrong: {studentProblems[2]}</Typography>
					<Typography className="problem-count">Total: {studentProblems[0]}</Typography>
				</CardContent>
			</Card>
		</div>
	)
}

export default TeacherOverviewScreen;
