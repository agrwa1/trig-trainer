import React from 'react'
import { Typography, Button } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { GoogleAuthProvider, getAuth, signInWithPopup  } from 'firebase/auth'
import { firebaseApp } from '../firebase'

const SignUpScreen = () => {
    const provider = new GoogleAuthProvider()
    const auth = getAuth(firebaseApp)
    const handleClick = () => {
        //hopefully this doesn't mess up bc i have no error handling
        signInWithPopup(auth, provider) 
    }

    // add functionality: redirect to profile on succesful sign in/up
    return (
        <div>
            
            <Typography variant="h1">This is the sign up and log in screen</Typography>
            <Button variant="contained" onClick={handleClick}>Sign up with Google</Button>
        </div>
    )
}

export default SignUpScreen;