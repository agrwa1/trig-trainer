import React from 'react'
import { Typography, Button } from '@material-ui/core'
import { Link } from 'react-router-dom'
const homeScreen = () => {
    return (
        <div>
            <Link to="/test"><Button variant="contained">Test</Button></Link>
            <Link to="profile"><Button variant="contained">Profile</Button></Link>
            <Typography variant="h1">This is the home screen</Typography>
            <Typography variant="h2">This is where you can learn the different trig angles</Typography>
        </div>
    )
}

export default homeScreen;