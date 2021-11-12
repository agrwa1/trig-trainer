import React, { useState, useEffect } from 'react';
import { Typography, Button, Avatar } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { getAuth, signOut } from 'firebase/auth'
import { firebaseApp, db } from '../firebase'
import { collection, where, query, getDocs } from 'firebase/firestore'
import { Redirect, useHistory } from 'react-router-dom'


const ProfileScreen = () => {
    const [name, setName] = useState(" ")
    const [id, setId] = useState("")

    const auth = getAuth(firebaseApp)
    useEffect(() => {
        console.log(auth)
    })

    if (!auth) {
        return <Redirect to='/signup' />
    }
    // let history = useHistory()
    // history.push('/signup')


    //this doesn't work for some reason
    // setId(auth.currentUser.uid)

    // setName(auth.currentUser.displayName)

    console.log(name)

    // add function try catch 
    // try: using display name and other auth functions
    // catch: redirect to sign up page


    const getUserInfo = async () => {
        const q = query(collection(db, "correct") , where("user_id", "==", "tp3WPFju5feWpyucCyy0XXTMmrB3"))
        const querySnapshot = await getDocs(q) 
        console.log(querySnapshot)
    }

    
    return (
        <div>
            
            {/* add functionality: if user is not logged in --> sign up screen */}
            {/* {
                !auth &&
                <Redirect to="/signup" />
            }
             */}
             <Typography variant="h1">This is the Profile Page </Typography>
                    {/* // make this not break */}
                   {/* <Avatar alt={auth.currentUser.displayName} src={auth.currentUser.photoURL}> {auth.currentUser.displayName[0]} </Avatar>
                    <Typography variant="h1">Hello,{auth.currentUser.displayName ? auth.currentUser.displayName : " "}</Typography> */}
            <SignOutButton />
            
        </div>
    )
}

const SignOutButton = () => {
    const auth = getAuth(firebaseApp)
    const handleClick = () => {
        signOut(auth)
        console.log(auth)
    }
    return (
        <Button variant="contained" onClick={handleClick}>Sign out of Google</Button>
    )
}

export default ProfileScreen;