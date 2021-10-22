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
            <Link to="/"><Button variant="contained">Home</Button></Link>
            <Link to="/test"><Button variant="contained">Test</Button></Link>
            <Link to="/profile"><Button variant="contained">Profile</Button></Link>
            <Link to="/signup"><Button variant="contained">Sign Up</Button></Link>
            <Typography variant="h1">This is the sign up and log in screen</Typography>
            <Button variant="contained" onClick={handleClick}>Sign up with Google</Button>
        </div>
    )
}

export default SignUpScreen;