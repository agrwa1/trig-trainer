import React from 'react'
import { Typography, Button } from '@material-ui/core'
import { Link } from 'react-router-dom'
const HomeScreen = () => {
    return (
        <div>
            <Link to="/"><Button variant="contained">Home</Button></Link>
            <Link to="/test"><Button variant="contained">Test</Button></Link>
            <Link to="/profile"><Button variant="contained">Profile</Button></Link>
            <Link to="/signup"><Button variant="contained">Sign Up</Button></Link>
            <Typography variant="h1">This is the Home Page</Typography>
            <Typography variant="h2">This is where you can learn the different trig angles ... sin cos</Typography>
            <Typography variant="h2">This is where you can learn the different trig angles ... sin cos</Typography>
            <Typography variant="h2">This is where you can learn the different trig angles ... sin cos</Typography>
            <Typography variant="h2">This is where you can learn the different trig angles ... sin cos</Typography>
            <Typography variant="h2">This is where you can learn the different trig angles ... sin cos</Typography>
            <Typography variant="h2">This is where you can learn the different trig angles ... sin cos</Typography>
            <Typography variant="h2">This is where you can learn the different trig angles ... sin cos</Typography>
            <Typography variant="h2">This is where you can learn the different trig angles ... sin cos</Typography>
            <Typography variant="h2">This is where you can learn the different trig angles ... sin cos</Typography>
            <Typography variant="h2">This is where you can learn the different trig angles ... sin cos</Typography>
            <Typography variant="h2">This is where you can learn the different trig angles ... sin cos</Typography>
        </div>
    )
}

export default HomeScreen;