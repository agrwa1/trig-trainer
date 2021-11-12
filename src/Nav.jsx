import { Typography, Button } from '@material-ui/core'
import { Link } from 'react-router-dom'


const Nav = () => {
    return (
        <div>
            <Link to="/"><Button variant="contained">Home</Button></Link>
            <Link to="/test"><Button variant="contained">Test</Button></Link>
            <Link to="/profile"><Button variant="contained">Profile</Button></Link>
            <Link to="/signup"><Button variant="contained">Sign Up</Button></Link>
        </div>
    )
}

export default Nav