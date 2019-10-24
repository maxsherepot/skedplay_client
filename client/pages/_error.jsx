import React from 'react'
import {
    AnimationBackground,
} from "UI";
import cx from "classnames";

function Error({ statusCode }) {
    return (
        <>
            <AnimationBackground invert>
                <div className="absolute inset-0 z-50">
                    <img className="flex items-start justify-center w-full" src="/static/img/man.png" alt=""/>
                </div>
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