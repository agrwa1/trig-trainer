import React, {useState} from 'react'
import {Typography, Button, Avatar} from '@material-ui/core'
import { auth } from '../firebase'
import { signOut, getAuth } from 'firebase/auth'
import { Redirect, Link } from 'react-router-dom'

const ProfileScreen = () => {
    let auth = getAuth()
    const [render, reRender] = useState(0)

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

    
    return (
        <div className="profile">
            <div className="container">
                <div className="headers">
                    <Avatar className="avatar" alt={auth.currentUser.displayName} src={auth.currentUser.photoURL} />
                    <Typography variant="h2" className="header">{auth.currentUser.displayName}</Typography>
                </div>
                <div className="stats">
                    <Typography variant="body1" className="note">This page is still under construction. Feel free to test yourself on some trig. Just click <Link to="/test">here</Link></Typography>
                    {/* <Typography variant="h3" className="class-code">Class Code: 6eu28s</Typography>
                    <Typography variant="h3" className="achievement">Total Questions Attempted: 0</Typography>
                    <Typography variant="h3" className="achievement">Total Questions Answered Correctly: 0</Typography> */}
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