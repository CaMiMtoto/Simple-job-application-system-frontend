import './App.scss';
import React from "react";
import TopNavNar from "./components/common/TopNavNar";
import Footer from "./components/common/Footer";

import {Routes, Route} from "react-router-dom";
import Home from "./components/Home";
import NotFound from "./components/common/NotFound";
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from "./components/Login";
import Logout from "./components/Logout";
import authService from "./services/authService";
import AllApplications from "./components/application/AllApplications";
import Details from "./components/application/details";

class App extends React.Component {
    state = {}

    componentDidMount() {
        const user = authService.getCurrentUser();
        this.setState({user});
    }

    render() {
        const {user} = this.state;
        return (
            <React.Fragment>
                <ToastContainer/>
                <div className="tw-flex tw-flex-col tw-min-h-screen tw-justify-between">
                    <div className="tw-flex-grow">
                        <TopNavNar user={user}/>
                        <Routes>
                            <Route path="/" element={<Home/>}/>
                            <Route path="/login" element={<Login/>}/>
                            <Route path="/logout" element={<Logout/>}/>
                            <Route path="/applications" element={<AllApplications/>}/>
                            <Route path="/applications/:id" element={<Details/>}/>
                            <Route path="/not-found" element={<NotFound/>}/>
                            <Route path="*" element={<NotFound/>}/>
                        </Routes>
                    </div>

                    <Footer/>
                </div>
            </React.Fragment>

        );
    }
}

export default App;
