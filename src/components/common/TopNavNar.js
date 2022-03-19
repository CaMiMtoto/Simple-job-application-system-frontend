import React from 'react';
import {Container, Navbar} from "react-bootstrap";
import {LogoutIcon} from "@heroicons/react/outline";
import {Link} from "react-router-dom";

function TopNavNar({user}) {

    return (
        <Navbar bg="dark" expand="md" className="tw-py-4" variant="dark">
            <Container>
                <Link to="/" className="navbar-brand tw-text-gray-400">
                    Simple Job Application
                </Link>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <ul className="ms-auto navbar-nav">
                        <li className="nav-item">
                            <Link to="/" className="nav-link">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/applications" className="nav-link">Applications</Link>
                        </li>
                        {
                            !user &&
                            <li className="nav-item">
                                <Link to="/login" className="nav-link">Staff Login</Link>
                            </li>
                        }
                        {
                            user &&
                            <React.Fragment>
                                <li className="nav-item">
                                    <Link className="nav-link">
                                        {user.name}
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/logout" className="nav-link">
                                        Logout
                                        <LogoutIcon className="tw-h-5 tw-w-5"/>
                                    </Link>
                                </li>
                            </React.Fragment>
                        }


                    </ul>
                </Navbar.Collapse>
            </Container>
        </Navbar>

    );
}

export default TopNavNar;