import { Link } from 'react-router-dom'
import React, {useState, useEffect } from 'react'
// import "./Nav.css"
import {getAuth} from 'firebase/auth'
import { Avatar } from '@material-ui/core'

import { auth } from '../firebase'

import { useAuthState } from 'react-firebase-hooks/auth';


const Nav = () => {
    let auth = getAuth()
    const [user] = useAuthState(auth)
    // console.log(auth)

    useEffect(async () => {
        auth = await getAuth()
    })

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