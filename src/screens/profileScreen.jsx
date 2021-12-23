import React, { useState, useEffect } from 'react';
import { Typography, Button, Avatar } from '@material-ui/core'
import { getAuth, signOut, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
// import { auth } from '../firebase'
import { Redirect, Link } from 'react-router-dom'



const ProfileScreen = () => {
    const [reload, setReload] = useState(0)
    const [name, setName] = useState(" ")
    const [id, setId] = useState("")
    const provider = new GoogleAuthProvider();
    const auth = getAuth()


    // const getUserInfo = async () => {
    //     const correctRef = db.collection('correctProblems');
    //     const snapshot = await correctRef.get();
    //     snapshot.forEach(doc => {
    //         console.log(doc.id, '=>', doc.data());
    //     });
    // }

    useEffect(() => {
        setReload(num => num + 1)
        console.log(auth)
    })
    
    return (
        <div style={{ padding: '1em'}}>
            {/* { 
                auth.currentUser && 
           
                <div>
                
                <div style={{display: 'flex', alignItems: 'center'}}>
                    <Avatar alt={auth.currentUser.displayName} src={auth.currentUser.photoURL} style={{height: '3em', margin: 10, width: '3em'}}> {auth.currentUser.displayName[0]} </Avatar>
                    <Typography variant="h1">Hello, {auth.currentUser.displayName}</Typography>
                </div>
                        
                <Link to="/test" className="link"><Button variant="outlined" style={{display: 'inline-block'}} >Start Learning</Button ></Link>
                <SignOutButton />
                </div>
            }

            {
                !auth.currentUser &&
                <Redirect to="/signup" />
            } */}
            <Typography variant="h1">This is the profile page</Typography>


        </div>
    )
}

// const SignOutButton = () => {
//     const [cur, setCur] = useState(true)
//     const auth = getAuth(firebaseApp)
//     const handleClick = () => {
//         signOut(auth)
//         console.log(auth)
//     }



//     return (
//         <div>
//             <Button variant="contained" onClick={handleClick}>Sign out of Google</Button>
//         </div>
//     )
// }

export default ProfileScreen;