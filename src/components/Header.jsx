import React, { useContext } from 'react';
import { Button, Container, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProvider';

const Header = () => {
    const {user,logOut} = useContext(AuthContext)
    const handleLogout = () =>{
        logOut()
        .then(result =>{

        })
        .catch(error=>console.log(error))
    }

    return (
        <div>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Container>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Link className='text-decoration-none text-white fs-5 pe-3' to='/' >Home</Link>
                        <Link className='text-decoration-none text-white fs-5 pe-3' to='/booking' >Booking</Link>
                        <Link className='text-decoration-none text-white fs-5 pe-3' to='/order' >Order</Link>
                        <Link className='text-decoration-none text-white fs-5 pe-3' to='/' >{user && user.email}</Link>
                    </Nav>
                    <Nav >
                        {
                            user ? <Link className='text-decoration-none text-white fs-5 pe-3 btn btn-primary' to='/login' onClick={handleLogout}>Logout</Link> : <>
                            <Link to='/login'><Button className='me-3' variant="primary" >Login</Button></Link>
                            <Link to= '/register'><Button variant="success" >Register</Button> </Link>
                            </>
                        }
                        
                    </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
};

export default Header;