import { Link } from 'react-router-dom'
import React, {useState, useEffect } from 'react'
// import "./Nav.css"
import {getAuth} from 'firebase/auth'
import { Avatar } from '@material-ui/core'

import { auth } from '../firebase'

import { useAuthState } from 'react-firebase-hooks/auth';

import { firebaseGetUserIsTeacher } from '../utils/firebaseFunctions'

const Nav = () => {
    const [user] = useAuthState(auth)
    const [userIsTeacher, setUserIsTeacher] = useState(false)

    useEffect(async () => {
        await getUserInfo()
        
    }, user)

    const getUserInfo = async () => {
        if (!auth.currentUser) return
        const email = auth.currentUser.email
        if (!email) return;
        setUserIsTeacher(await firebaseGetUserIsTeacher(email))
    }

    return (
        <div className="nav">
            <Link to="/" className="link" style={{textDecoration: 'none'}}>
                <h1 className="link-text" style={{paddingTop: '.2em', paddingBottom: '.2em'}} >Trig<a>Trainer</a></h1>
            </Link>
            <div className="links">
                {/* <Link to="/" ><a className='link-text'>Home</a ></Link> */}
                <Link to="/test" className="link-text">Test</Link>
                {
                    !user &&  
                    <Link to="/signup" className="link-text" >Sign Up/Log In</Link>
                }
                {
                    (user && userIsTeacher) &&
                    <Link to="/overview" className="link-text">Overview</Link>

                }
                {
                    user &&
                    <div >
                        <Link to="/profile" className="link-text" style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}} >
                            Profile
                            <Avatar alt={auth.currentUser.displayName} src={auth.currentUser.photoURL} style={{marginLeft: '1em'}} />
                        </Link>
                    </div>
                }
            </div>
        </div>
        
    )
}

export default Nav