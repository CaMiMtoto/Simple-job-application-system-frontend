import React, {Component} from 'react';
import {Container, Nav, Navbar} from "react-bootstrap";
import {LogoutIcon} from "@heroicons/react/outline";

class TopNavNar extends Component {
    render() {
        return (
            <Navbar bg="dark" expand="md" className="tw-py-4" variant="dark">
                <Container>
                    <Navbar.Brand href="#home">
                        Simple Job Application
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto">
                            <Nav.Link href="#home">Home</Nav.Link>
                            <Nav.Link href="#link">Staff Login</Nav.Link>
                            <Nav.Link href="#link">
                                Logout
                                <LogoutIcon className="tw-h-5 tw-w-5"/>
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

        );
    }
}

export default TopNavNar;