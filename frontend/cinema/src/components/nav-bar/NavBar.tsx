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
                    <Link to="/">
                        Cinema
                    </Link>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Link to="/">Home </Link>
                        <Link to="/movies">Movies </Link>
                        {auth?.token ? <Link to="/user">{auth?.firstname}</Link> : <Link to="/login">Login </Link>}
                        {auth?.token ? <button onClick={logout}>Logout</button> : <Link to="/signup">Sign up </Link>}
                        {auth?.admin ? <Link to="/admin">Admin</Link> : null}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavBar;
