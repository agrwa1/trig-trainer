import React, {useState, useEffect} from 'react'
import {Typography, Button, Avatar} from '@material-ui/core'
import { auth } from '../firebase'
import { signOut, getAuth } from 'firebase/auth'
import { Redirect, Link } from 'react-router-dom'

import { useAuthState } from 'react-firebase-hooks/auth';

import { firebaseGetStudentProblems, firebaseGetStudentCorrectProblems, firebaseGetStudentWrongProblems } from '../utils/firebaseFunctions'
import { firebaseGetStudentInfo} from '../utils/firebaseFunctions'

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
    const [allProblems, setAllProblems] = useState(0)
    const [correctProblems, setCorrectProblems] = useState(0)
    const [wrongProblems, setWrongProblems] = useState(0)
    const [studentInfo, setStudentInfo] = useState({})
    const [reload, setReload] = useState(false)

    useEffect(async () => {
        setStudentInfo(await firebaseGetStudentInfo(auth.currentUser.email))
        setAllProblems(await firebaseGetStudentProblems(auth.currentUser.email))
        setCorrectProblems(await firebaseGetStudentCorrectProblems(auth.currentUser.email))
        setWrongProblems(await firebaseGetStudentWrongProblems(auth.currentUser.email))
    }, [reload])

    
    return (
        <div className="profile">
            
            <div className="container">
                <div className="headers">
                    <Avatar className="avatar" alt={auth.currentUser.displayName} src={auth.currentUser.photoURL} />
                    <Typography variant="h2" className="header">{auth.currentUser.displayName}</Typography>
                </div>
                <div className="stats">
                    <Typography variant="h3" className="class-code">Email: {studentInfo.email}</Typography>
                    <Typography variant="h3" className="achievement">Total Questions Attempted: {allProblems} </Typography>
                    <Typography variant="h3" className="achievement">Total Questions Correct: {correctProblems}</Typography>
                    <Typography variant="h3" className="achievement">Total Questions Wrong: {wrongProblems}</Typography>

                </div>
                <div className="buttons">
                    <Link to="/test" >
                        <Button variant="contained" className="test-link">Test Yourself</Button>
                    </Link>
                    <Button variant="contained" className="sign-out" onClick={handleClick}>Sign Out</Button>
                </div>
            </div>
        </div>
    )
}


export default ProfileScreen;