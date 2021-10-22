import React from 'react'
import { Typography, Button } from '@material-ui/core'
import { Link } from 'react-router-dom'
const profileScreen = () => {
    return (
        <div>
            <Link to="/"><Button variant="contained">Home</Button></Link>
            <Link to="/test"><Button variant="contained">Test</Button></Link>
            <Typography variant="h1">This is the profile screen</Typography>
        </div>
    )
}

export default profileScreen;