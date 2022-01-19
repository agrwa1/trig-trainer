import React, {useState, useEffect} from 'react'
import {Typography, Button, Avatar, TextField} from '@material-ui/core'
import { auth } from '../firebase'
import { signOut, getAuth } from 'firebase/auth'
import { Redirect, Link } from 'react-router-dom'

import { useAuthState } from 'react-firebase-hooks/auth';

import { firebaseGetStudentProblems, firebaseCreateClass } from '../utils/firebaseFunctions'
import { firebaseGetStudentInfo} from '../utils/firebaseFunctions'
import { firebaseCreateBasicUser, firebaseCreateTeacherUser, firebaseFindUserExistsByEmail } from '../utils/firebaseFunctions'
// firebaseCreateClass('Mr. Teacher', "Mr. Teacher's Calculus 1st Period")
import { firebaseAddStudentToClass } from '../utils/firebaseFunctions'


const ProfileScreen = () => {
    let auth = getAuth()
    const [render, reRender] = useState(0)
    const [user] = useAuthState(auth)
    

    const handleClick = async () => {
        await signOut(auth)
        reRender(num => num + 1)
    }

    


    return ( // handles rerouting for unauthorized
        <div>
            { 
                !auth.currentUser &&
                <Redirect to="/signup" />
            }
            {
                auth.currentUser &&
                <Content handleClick={handleClick}/>

            }

        </div>
        
    )

}

const Content = ({handleClick}) => {
    let auth = getAuth()
    const [allProblems, setAllProblems] = useState([])
    const [studentInfo, setStudentInfo] = useState({})
    const [reload, setReload] = useState(false)
    const [classCode, setClassCode] = useState('')

    const createUser = async () => {
        await firebaseCreateBasicUser({name: auth.currentUser.displayName, email: auth.currentUser.email, photo_url: auth.currentUser.photoURL}) // when user signs up, creates default student account
    }
    const checkUserExistence = async () => {
        return await firebaseFindUserExistsByEmail(auth.currentUser.email)
    }

    const checkAndCreate = async () => {
        // eventually need to move this to sign up page. If user doesn't exist, create user

        // if user already has account
        const userExists = await checkUserExistence()
        if (userExists) return;
        
        // if user doesn't exist, create account
        await createUser()
    }

    const createTeacherUser = async () => {
        console.log('starting creating teacher')
        await firebaseCreateTeacherUser({email: auth.currentUser.email})
    }

    useEffect(async () => {
        // don't need to verify user exists, b/c if they didn't they would be automatically redirected to sign up page
        checkAndCreate(); // this is not await b/c this shouldn't be blocking
        setStudentInfo(await firebaseGetStudentInfo(auth.currentUser.email))
        // this will return an array of length 3 that contains the total number of problems, the number of correct problems, and the number of wrong problems
        setAllProblems(await firebaseGetStudentProblems(auth.currentUser.email))
    }, [reload])

    const joinClass = async () => {
        await firebaseAddStudentToClass(studentInfo.email, classCode, studentInfo.classes)
        alert('Class has been joined')
        setClassCode('')
    }

    // user is student && join class w code
    return (
        <div className="profile">
            
            <div className="container">
                <div className="headers">
                    <Avatar className="avatar" alt={auth.currentUser.displayName} src={auth.currentUser.photoURL} />
                    <Typography variant="h2" className="header">{auth.currentUser.displayName}</Typography>
                </div>
                <div className="stats">
                    
                    <Typography variant="h3" className="class-code">Email: {auth.currentUser.email}</Typography>
                    <Typography variant="h3" className="achievement">Total Questions Attempted: {allProblems[0]} </Typography>
                    <Typography variant="h3" className="achievement">Total Questions Correct: {allProblems[1]}</Typography>
                    <Typography variant="h3" className="achievement">Total Questions Wrong: {allProblems[2]}</Typography>

                </div>

                <div className="join-class" style={{display: 'flex', justifyContent: 'start', alignItems: 'center'}}>
                    <TextField variant="outlined" value={classCode} onChange={e => setClassCode(e.target.value)} placeholder="Class Code" size="small"/>
                    <Button variant="outlined" onClick={joinClass}>Join Class</Button>
                </div>
                <div className="buttons">
                    <Button variant="contained" onClick={createTeacherUser} className="test-link">Become a Teacher</Button>
                    
                    <Button variant="contained" className="sign-out" onClick={handleClick}>Sign Out</Button>
                </div>
            </div>
        </div>
    )
}


export default ProfileScreen;