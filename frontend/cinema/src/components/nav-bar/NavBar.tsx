import React from 'react';
import {Container, Nav, Navbar} from "react-bootstrap";
import {LinkContainer} from 'react-router-bootstrap';
import useAuth from "../../hooks/useAuth";


export const NavBar = () => {
    // @ts-ignore
    const {auth} = useAuth();
    // @ts-ignore
    const {setAuth} = useAuth();

    const logout = () => {
        setAuth({});
    }


    return (
        
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand>
                    <LinkContainer to="/"><Navbar.Brand  href="/">
                        Cinema
                    </Navbar.Brand></LinkContainer>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <LinkContainer to="/"><Nav.Link>Home </Nav.Link></LinkContainer>
                    <LinkContainer to="/movies"><Nav.Link>Movies </Nav.Link></LinkContainer>
                    {auth?.token ? <LinkContainer to="/user"><Nav.Link>{auth?.firstname}</Nav.Link></LinkContainer>
                        : <LinkContainer to="/login"><Nav.Link>Login </Nav.Link></LinkContainer>}
                    {auth?.token ? <button onClick={logout}>Logout</button>
                        : <LinkContainer to="/signup"><Nav.Link>Sign up </Nav.Link></LinkContainer>}
                    {auth?.admin ? <LinkContainer to="/admin"><Nav.Link>Admin</Nav.Link></LinkContainer> : null}
            
                </Nav>
            </Navbar.Collapse>
        </Container>
    </Navbar>
    );
}

export default NavBar;
