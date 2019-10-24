import React from 'react'
import Link from 'next/link'
import {
    Button,
    AnimationBackground,
} from "UI";

function Error({ statusCode }) {
    const Display404 = () => (
        <div className="relative flex flex-col items-start mx-auto hd:w-7/12">
            <span className="mb-3">Error #404</span>
            <h1 className="text-6xl font-extrabold">PAGE NOT FOUND</h1>
            <p>We're sorry, the page you requested could not be found.</p>

            <div className="flex mt-6">
                <Link href="/">
                    <a>
                        <Button className="px-16 mr-3">Go home</Button>
                    </a>
                </Link>
                <Link href="/girls/add">
                    <a>
                        <Button className="px-16" outline>
                            <span className="text-black hover:text-white">Add new add</span>
                        </Button>
                    </a>
                </Link>
            </div>

            <span className="absolute right-0 bottom-0">Copyright © 2019 Skedplay. All rights reserved.</span>
        </div>
    );

    const DisplayServerError = () => (
        <div className="flex flex-col items-start mx-auto hd:w-7/12">
            <h1 className="text-6xl font-extrabold">An error occurred on server</h1>
        </div>
    );

    const Footer = () => (
        <div className="fluid-container">
            {{
                404: (
                    <Display404 />
                ),
            }[statusCode] || <DisplayServerError />}
        </div>
    );

    return (
        <>
            <AnimationBackground invert footer={<Footer />}>
                <img className="absolute inset-0 flex items-start justify-center mx-auto w-1/2" src="/static/img/man.png" alt=""/>
                <img className="absolute inset-0 flex items-start justify-center mx-auto w-1/4" src="/static/img/woman.png" alt=""/>
            </AnimationBackground>
        </>
        // <p>
        //     {statusCode
        //         ? `An error ${statusCode} occurred on server`
        //         : 'An error occurred on client'}
        // </p>
    )
}

Error.getInitialProps = ({ res, err }) => {
    const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
    return { statusCode }
};

Error.getLayout = page => page;

export default Error