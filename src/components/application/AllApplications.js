import React, {Component} from 'react';
import _ from 'lodash';
import {getApplications} from "../../services/applicationService";
import {paginate} from "../common/paginate";
import {Link} from "react-router-dom";
import Pagination from "../common/pagination";

import {Form} from 'react-bootstrap';

class AllApplications extends Component {
    state = {
        applications: [],
        pageSize: 10,
        currentPage: 1,
        sortColumn: {path: "title", order: "asc"},
        searchQuery: "",
    };


    async componentDidMount() {
        const applications = (await getApplications()).data;

        this.setState({
            applications: applications,
        });
    }

    handlePageChange = (page) => {
        this.setState({currentPage: page});
    };


    getPageData = () => {
        const {
            applications: allApplications,
            currentPage,
            pageSize,
            sortColumn,
            searchQuery,
        } = this.state;

        let filteredApplications = allApplications;

        if (searchQuery) {
            filteredApplications = allApplications.filter((m) =>
                m.firstName.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        let sorted = _.orderBy(
            filteredApplications,
            [sortColumn.path],
            [sortColumn.order]
        );
        const applications = paginate(sorted, currentPage, pageSize);
        return {
            totalCount: filteredApplications.length,
            data: applications,
        };
    };

    handleSearch = (query) => {
        this.setState({searchQuery: query, currentPage: 1});
    };


    render() {

        const {
            applications: allApplications,
            currentPage,
            pageSize,
            searchQuery,
        } = this.state;
        const {length: count} = allApplications;

        if (count === 0)
            return <div className="mt-5 container">
                <div className="alert alert-info">
                    There are no applications
                </div>
            </div>;

        const {totalCount, data} = this.getPageData();
        return (
            <div className="container tw-my-3">
                <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-3">
                    <h4 className="tw-mb-0 tw-col-span-2">All Applications</h4>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Control type="search" onChange={event => this.handleSearch(event.target.value)}
                                      placeholder="Search by Name"/>
                    </Form.Group>
                </div>

                <div className="tw-flex tw-flex-col">
                    <div className="tw-overflow-x-auto sm:tw--mx-6 lg:tw--mx-8">
                        <div className="tw-inline-block tw-py-2 tw-min-w-full sm:tw-px-6 lg:tw-px-8">
                            <div className="tw-overflow-hidden tw-shadow sm:tw-rounded">
                                <table className="tw-min-w-full">
                                    <thead className="tw-bg-gray-100 dark:tw-bg-gray-700">
                                    <tr>
                                        <th scope="col"
                                            className="tw-py-3 tw-px-6 tw-text-xs tw-font-semibold tw-tracking-wider tw-text-left tw-text-gray-700 tw-uppercase dark:tw-text-gray-400">
                                            Name
                                        </th>
                                        <th scope="col"
                                            className="tw-py-3 tw-px-6 tw-text-xs tw-font-semibold tw-tracking-wider tw-text-left tw-text-gray-700 tw-uppercase dark:tw-text-gray-400">
                                            Email
                                        </th>
                                        <th scope="col"
                                            className="tw-py-3 tw-px-6 tw-text-xs tw-font-semibold tw-tracking-wider tw-text-left tw-text-gray-700 tw-uppercase dark:tw-text-gray-400">
                                            Phone
                                        </th>
                                        <th scope="col"
                                            className="tw-py-3 tw-px-6 tw-text-xs tw-font-semibold tw-tracking-wider tw-text-left tw-text-gray-700 tw-uppercase dark:tw-text-gray-400">
                                            Date Of Birth
                                        </th>
                                        <th scope="col"
                                            className="tw-py-3 tw-px-6 tw-text-xs tw-font-semibold tw-tracking-wider tw-text-left tw-text-gray-700 tw-uppercase dark:tw-text-gray-400">
                                            Status
                                        </th>
                                        <th scope="col" className="tw-relative tw-py-3 tw-px-6">
                                            <span className="tw-sr-only">Option</span>
                                        </th>
                                    </tr>
                                    </thead>
                                    <tbody>

                                    {
                                        data.map((application) => (
                                            <tr key={application.id}
                                                className="tw-border-b  tw-border-gray-100  odd:tw-bg-white even:tw-bg-gray-50 odd:dark:tw-bg-gray-800 even:dark:tw-bg-gray-700 dark:tw-border-gray-600">
                                                <td className="tw-py-1 tw-px-6 tw-text-sm tw-font-medium tw-text-gray-900 tw-whitespace-nowrap dark:tw-text-white">
                                                    {application.full_name}
                                                </td>
                                                <td className="tw-py-1 tw-px-6 tw-text-sm tw-text-gray-500 tw-whitespace-nowrap dark:tw-text-gray-400">
                                                    <a href={'mailto:' + application.email}
                                                       className="tw-no-underline tw-text-gray-500">
                                                        {application.email}
                                                    </a>
                                                </td>
                                                <td className="tw-py-1 tw-px-6 tw-text-sm tw-text-gray-500 tw-whitespace-nowrap dark:tw-text-gray-400">
                                                    <a href={'tel:' + application.phone}
                                                       className="tw-no-underline tw-text-gray-500">
                                                        {application.phone}
                                                    </a>
                                                </td>

                                                <td className="tw-py-1 tw-px-6 tw-text-sm tw-text-gray-500 tw-whitespace-nowrap dark:tw-text-gray-400">
                                                    {application.dateOfBirth}
                                                </td>
                                                <td className="tw-py-1 tw-px-6 tw-text-sm tw-text-gray-500 tw-whitespace-nowrap dark:tw-text-gray-400">

                                                    <span
                                                        className={`badge bg-${application.status_color} tw-rounded-xl`}>
                                                         {application.status}
                                                    </span>
                                                </td>
                                                <td className="tw-py-1 tw-px-6 tw-text-sm tw-font-medium tw-text-right tw-whitespace-nowrap">
                                                    <Link to={'/applications/' + application.id}
                                                          className="btn btn-primary btn-sm">
                                                        Details
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="tw-flex tw-flex-col md:tw-flex-row md:tw-justify-between">
                    <div>
                        <p>
                            Showing {data.length} {/*to {data.length}*/} of {totalCount} entries
                        </p>
                    </div>
                    <Pagination
                        itemsCount={totalCount}
                        pageSize={pageSize}
                        currentPage={currentPage}
                        onPageChange={this.handlePageChange}
                    />
                </div>

            </div>
        );
    }
}

export default AllApplications;