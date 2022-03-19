import {Component} from "react";

class Footer extends Component {
    render() {
        return <footer
            className="bg-dark tw-text-white tw-text-center tw-py-4 tw-flex tw-justify-center tw-items-center tw-text-sm tw-mt-5">
            <p className="tw-mb-0">
                &copy; {new Date().getFullYear()} Simple Job Application. All rights reserved.
            </p>
        </footer>;
    }
}

export default Footer;