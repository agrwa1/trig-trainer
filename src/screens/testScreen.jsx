import React from 'react'
import { Typography, Button } from '@material-ui/core'
import { Link } from 'react-router-dom'
const testScreen = () => {
    return (
        <div>
            <Link to="/"><Button variant="contained">Home</Button></Link>
            <Link to="profile"><Button variant="contained">Profile</Button></Link>
            <Typography variant="h1">This is the Test Screen</Typography>
        </div>
    )
}

export default testScreen;