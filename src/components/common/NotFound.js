import React, {Component} from 'react';

class NotFound extends Component {
    render() {
        return (
            <div className="tw-flex tw-justify-center tw-items-center tw-flex-col tw-min-h-[40vh]">
                <h1 className="tw-text-8xl tw-text-red-400">404</h1>
                <p className="tw-text-2xl tw-font-semibold">Page not found</p>
            </div>
        );
    }
}

export default NotFound;