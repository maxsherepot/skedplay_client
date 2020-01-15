import React from 'react'
import Link from 'next/link'
import {
    Logo,
    Button,
    AnimationBackground,
} from "UI";
import {useTranslation} from "react-i18next";

function Error({statusCode}) {
    const {t, i18n} = useTranslation();

    const Display404 = () => (
        <div className="relative flex flex-col items-start mx-auto hd:w-7/12">
            <span className="mb-3">{t('errors.error')} #404</span>
            <h1 className="text-6xl font-extrabold">{t('errors.page_not_found')}</h1>
            <p>{t('errors.sorry_not_found')}</p>

            <div className="flex mt-6">
                <Link href="/">
                    <a>
                        <Button className="px-16 mr-3">{t('navigation.go_home')}</Button>
                    </a>
                </Link>
                <Link href="/girls/add">
                    <a>
                        <Button className="px-16" outline>
                            <span className="text-black hover:text-white">{t('navigation.add_new')}</span>
                        </Button>
                    </a>
                </Link>
            </div>

            <span className="absolute right-0 bottom-0">{t('common.copyright')}</span>
        </div>
    );

    const DisplayServerError = () => (
        <div className="flex flex-col items-start mx-auto hd:w-7/12">
            <h1 className="text-6xl font-extrabold">{t('errors.error_occurred')}</h1>
        </div>
    );

    const Footer = () => (
        <div className="fluid-container">
            {{
                404: (
                    <Display404/>
                ),
            }[statusCode] || <DisplayServerError/>}
        </div>
    );

    return (
        <>
            <AnimationBackground invert footer={<Footer/>}>
                <div className="absolute inset-0 fluid-container hd:w-7/12 mx-auto flex">
                    <div className="">
                        <Logo className="text-white my-20 z-50" />
                    </div>
                </div>

                <div className="fluid-container">
                    <img className="absolute inset-0 flex items-start justify-center mx-auto w-1/2"
                         src="/static/img/man.png" alt=""/>
                    <img className="absolute inset-0 flex items-start justify-center mx-auto mt-16 w-1/4"
                         src="/static/img/woman.png" alt=""/>
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


Error.getInitialProps = ({res, err}) => {
    const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
    return {statusCode}
};

Error.getLayout = page => page;

export default Error;