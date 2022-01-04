import { Link } from 'react-router-dom'
// import "./Nav.css"


const Nav = () => {
    return (
        <div className="nav">
            <Link to="/" className="link" style={{textDecoration: 'none'}}>
                <h1 className="link-text" style={{paddingTop: '.2em', paddingBottom: '.2em'}} >TrigTrainer</h1>
            </Link>
            <div className="links">
                {/* <Link to="/" ><a className='link-text'>Home</a ></Link> */}
                <Link to="/test" ><a className='link-text'>Test</a ></Link>
                <Link to="/profile" ><a className='link-text'>Profile</a ></Link>
                <Link to="/signup" ><a className='link-text' >Sign Up/Log In</a ></Link>
            </div>
        </div>
        
    )
}



export default Nav