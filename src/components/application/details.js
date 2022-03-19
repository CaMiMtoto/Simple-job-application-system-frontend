import React, {useEffect} from 'react';
import {changeApplicationStatus, getApplication} from "../../services/applicationService";

import {toast} from "react-toastify";
import {useParams, useNavigate} from "react-router-dom";

function Details() {

    let params = useParams();
    let navigate = useNavigate();

    const applicationId = params.id;

    const [application, setApplication] = React.useState(null);
    const [status, setStatus] = React.useState(null);

    /*
        const application = (await getApplication(applicationId)).data;

        if (!application)
            return this.props.history.replace("/not-found");
        */

    useEffect(() => {
        async function fetchData() {
            return (await getApplication(applicationId)).data;
        }

        fetchData().then(app => setApplication(app));


    }, [applicationId]);

    const handleSubmit = (e) => {
        e.preventDefault();

        changeApplicationStatus(applicationId, status)
            .then(() => {
                setApplication(application => ({...application, status: status}));
                toast.success("Status changed successfully");
                navigate("/applications");
            });
    };


    return (
        <div className="container tw-my-10">
            <h4>Application Details</h4>
            {
                application &&

                <div className="tw-space-y-3">
                    <div className="row">
                        <div className="col-md-6">
                            <strong>First Name</strong>: {application.firstName}
                        </div>
                        <div className="col-md-6">
                            <strong>Last Name</strong>: {application.lastName}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <strong>Email</strong>: {application.email}
                        </div>
                        <div className="col-md-6">
                            <strong>Phone</strong>: {application.phone}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <strong>Address</strong>: {application.address}
                        </div>
                        <div className="col-md-6">
                            <strong>Date Of Birth</strong>: {application.dateOfBirth}
                        </div>
                    </div>
                    <div className="row">

                        <div className="col-md-12">
                            <strong>Cover Letter</strong>:
                            <p>
                                {application.coverLetter > 0 ? application.coverLetter :
                                    <span className="tw-text-red-600">No cover letter</span>}
                            </p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <strong>
                                <a href={application.cvUrl} className="btn btn-danger btn-sm" target="_blank">Download
                                    CV
                                </a>
                            </strong>
                        </div>
                        <div className="col-md-6">
                            <strong>Status</strong>: {application.status}
                        </div>
                    </div>
                    <hr className="tw-border-gray-200 tw-border tw-border-2 "/>
                    <h5 className="tw-mb-5">
                        Change Application Status
                    </h5>
                    {
                        application.status === "Pending" ?
                            <div>

                                <form onSubmit={handleSubmit}>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="tw-mb-3">
                                                <label htmlFor="status">Status</label>
                                                <select onChange={event => setStatus(event.target.value)}
                                                        required className="form-control" id="status">
                                                    <option value=""> select status</option>
                                                    <option value="Dropped">Dropped</option>
                                                    <option value="Passed">Passed</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <button type="submit" className="btn btn-primary">
                                        Save Changes
                                    </button>
                                </form>
                            </div>
                            : <div className="alert alert-info">Decision has been made</div>
                    }


                </div>
            }

        </div>
    );
}


export default Details;