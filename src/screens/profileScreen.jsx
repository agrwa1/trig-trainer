import React, {useState} from 'react'
import {Typography, Button } from '@material-ui/core'
import { auth } from '../firebase'
import { signOut } from 'firebase/auth'
import { Redirect, Link } from 'react-router-dom'

const ProfileScreen = () => {
    const [render, reRender] = useState(0)

    const handleClick =() => {
        signOut(auth)
        reRender(num => num + 1)
    }

    return (
        <div>
            { 
                !auth.currentUser &&
                <Redirect to="/signup" />
            }
            {
                auth.currentUser &&
                <div className="profile">
                    <div className="container">
                        <Typography variant="h2" className="header">Hello, {auth.currentUser.displayName}</Typography>
                        <Typography variant="body1" className="note">This page is still under construction. Feel free to test yourself on some trig. Just click <Link to="/test">here</Link></Typography>
                        <div className="buttons">
                            <Link to="/test" >
                                <Button variant="contained" className="test-link">Test Yourself</Button>
                            </Link>
                        <Button variant="contained" className="sign-out" onClick={handleClick}>Sign Out</Button>
                        </div>
                    </div>
                </div>

            }


        </div>
        
    )

}


export default ProfileScreen;