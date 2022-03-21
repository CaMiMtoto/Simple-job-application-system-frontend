import React from "react";

import authService from "../services/authService";

import {useNavigate} from "react-router-dom";
import {Form} from "react-bootstrap";
import {toast} from "react-toastify";

function Login() {


    let navigate = useNavigate();


    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [loading, setLoading] = React.useState(false);

    React.useEffect(() => {
        if (authService.getCurrentUser())
            window.location = "/applications";
    }, [navigate]);


    let handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);
            await authService.login(username, password);
            window.location = "/applications";
            setLoading(false);
        } catch (ex) {
            setLoading(false);
            if (ex.response && ex.response.status === 401) {
                console.log(ex.response.data);
                toast.error("Invalid username or password");
            }

        }

    };


    return (
        <div className="container">
            <div className="row justify-content-center tw-my-10">
                <div className="col-md-6 col-lg-5 col-sm-8">

                    <div className="shadow-sm card rounded-3">
                        <div className="px-4 py-3 bg-transparent card-header border-bottom-0">
                            <h4>Login</h4>
                            <p className="small">Enter your email and password to login.</p>
                        </div>
                        <div className="px-4 card-body">

                            <Form onSubmit={handleSubmit} autoComplete="off" className="tw-mb-5">
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control onChange={event => setUsername(event.target.value)} type="email"
                                                  required
                                                  placeholder="Enter email"/>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control onChange={event => setPassword(event.target.value)} type="password"
                                                  required
                                                  placeholder="Password"/>
                                </Form.Group>

                                <button
                                    type="submit" disabled={loading}
                                    className="btn btn-primary tw-rounded tw-mt-4">
                                    Login
                                </button>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default Login;