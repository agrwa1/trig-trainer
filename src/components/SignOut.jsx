import { signOut, getAuth } from 'firebase/auth'
import { firebaseApp } from '../firebase'
import { Button, Typography } from '@material-ui/core'

const SignOutButton = () => {
    const auth = getAuth(firebaseApp)
    const handleClick = () => {
        signOut(auth)
    }
    return (
        <Button onClick={handleClick}><Typography variant="h2">Sign out of Google</Typography></Button>
    )
}

export default SignOutButton;