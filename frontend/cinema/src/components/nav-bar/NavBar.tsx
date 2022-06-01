import React from 'react';
import {Container, Nav, Navbar} from "react-bootstrap";
import {Link} from "react-router-dom";
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
                    <Navbar.Brand  href="/">
                        Cinema
                    </Navbar.Brand>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                        <Nav.Link href="/">Home </Nav.Link>
                        <Nav.Link href="/movies">Movies </Nav.Link>
                        {auth?.token ? <Nav.Link href="/user">{auth?.firstname}</Nav.Link> : <Nav.Link href="/login">Login </Nav.Link>}
                        {auth?.token ? <button onClick={logout}>Logout</button> : <Nav.Link href="/signup">Sign up </Nav.Link>}
                        {auth?.admin ? <Nav.Link href="/admin">Admin</Nav.Link> : null}
            
                </Nav>
            </Navbar.Collapse>
        </Container>
    </Navbar>
    );
}

export default NavBar;
