import React, { useState, useEffect } from 'react'
import { Typography } from '@material-ui/core'

import { GoogleAuthProvider, getAuth, signInWithPopup  } from 'firebase/auth'
import { auth } from '../firebase'
import { Redirect } from 'react-router-dom'
import GoogleButton from 'react-google-button'

const SignUpScreen = () => {
    const [reload, setReload] = useState(0)
    const provider = new GoogleAuthProvider()
    
    const handleClick = () => {
        //hopefully this doesn't mess up bc i have no error handling
        signInWithPopup(auth, provider) 
        // handle failure
    }

    useEffect(() => {
        setReload(num => num + 1)
    })

    return (
        <div style={{padding: '2em'}}>

            {
                auth.currentUser &&
                <Redirect to="/profile" />
            }

            {
                !auth.currentUser &&
                <div>
                    <Typography variant="h1">Please Log in with Google to continue </Typography>
                    <GoogleButton onClick={handleClick} type={'dark'}/>
                </div>
            }
            
        </div>
    )
}

export default SignUpScreen;