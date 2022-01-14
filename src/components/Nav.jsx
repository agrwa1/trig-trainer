import { Link } from 'react-router-dom'
// import "./Nav.css"
import {getAuth} from 'firebase/auth'
import { Avatar } from '@material-ui/core'

const Nav = () => {
    const auth = getAuth()
    // console.log(auth)
    return (
        <div className="nav">
            <Link to="/" className="link" style={{textDecoration: 'none'}}>
                <h1 className="link-text" style={{paddingTop: '.2em', paddingBottom: '.2em'}} >TrigTrainer</h1>
            </Link>
            <div className="links">
                {/* <Link to="/" ><a className='link-text'>Home</a ></Link> */}
                <Link to="/test" ><a className='link-text'>Test</a ></Link>
                {
                    !auth.currentUser &&
                    <Link to="/signup" ><a className='link-text'>Sign Up/Log In</a></Link>
                }
                {
                    auth.currentUser &&
                    <Link to="/profile" ><a className='link-text'>Profile</a></Link>
                }
                {
                    auth.currentUser &&
                    <Avatar alt={auth.currentUser.displayName} src={auth.currentUser.photoURL} />
                }
            </div>
        </div>
        
    )
}



export default Nav