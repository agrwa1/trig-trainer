import { Typography, Button, Container } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { Nav as NavItem, Navbar, NavDropdown } from 'react-bootstrap'
import "./Nav.css"


const Nav = () => {
    return (
        <div className="outside">
            <Link to="/" style={{textDecoration: 'none'}}><h1 className="header">TrigTrainer</h1></Link>
            <div>
                <Link to="/" className="link"><Typography className='link'>Home</Typography ></Link>
                <Link to="/test" className="link"><Typography className='link'>Test</Typography ></Link>
                {/* <Link to="/profile" className="link"><Typography className='link'>Profile</Typography ></Link> */}
                {/* <Link to="/signup" className="link"><Typography className='link' >Sign Up/Log In</Typography ></Link> */}
            </div>
        </div>
        
    )
}


export default Nav