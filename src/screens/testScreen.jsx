import React, { useState } from 'react'
import { Typography, Button } from '@material-ui/core'
import { Link } from 'react-router-dom'
const TestScreen = () => {

    const [streak, setStreak] = useState({sin: 0, cos: 0, tan: 0, sec: 0, csc: 0, cot: 0})
    

    // figure out what graph library to use
    // import problems
    // set state for type of problem

    return (
        <div>
            <Link to="/"><Button variant="contained">Home</Button></Link>
            <Link to="/test"><Button variant="contained">Test</Button></Link>
            <Link to="/profile"><Button variant="contained">Profile</Button></Link>
            <Link to="/signup"><Button variant="contained">Sign Up</Button></Link>
            <Typography variant="h1">This is the Test Screen</Typography>
        </div>
    )
}

export default TestScreen;