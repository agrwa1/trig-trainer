import React from 'react'
import { Typography, Button } from '@material-ui/core'
import { Link } from 'react-router-dom'
const signUpScreen = () => {
    return (
        <div>
            <Button variant="contained"><Link to="/test">Test</Link></Button>
            <Link to="profile"><Button variant="contained">Profile</Button></Link>
            <Typography variant="h1">This is the sign up and log in screen</Typography>
        </div>
    )
}

export default signUpScreen;