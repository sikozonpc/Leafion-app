import React from 'react';
import { Link } from "react-router-dom";


import { Navbar, Nav, Form, FormControl, Button } from "react-bootstrap";
 
const navbar = (props) => {
    return (
          <Navbar sticky="top" bg="dark" variant="dark" expand="lg">
                <Link className="navbar-brand" to="/"><i className="fab fa-pagelines"></i> Leafion</Link>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Link className="nav-link" to="/goals">Goals</Link>
                        <Link className="nav-link" to="/settings">Settings</Link>
                        <Link className="nav-link" to="/items">Dashboard</Link>
                        <Link className="nav-link" to="/auth">Login</Link>
                    </Nav>
                    <Form inline>
                    <FormControl type="text" onChange={(e) => props.setSearchResult(e.target.value)} placeholder="Search" className="mr-sm-2" />
                    <Link variant="outline-success" to="/search">Search</Link>
                    </Form>
                </Navbar.Collapse>
         
            </Navbar>

    );
};

export default navbar;