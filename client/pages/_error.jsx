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

            <div className="flex mt-6 flex-wrap error__btn-wrap">
                <Link href="/">
                    <a href="/">
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
            <h1 className="text-4xl font-extrabold">{t('errors.error_occurred')}</h1>
            <div className="flex mt-6 flex-wrap error__btn-wrap">
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
        </div>
    );

    const Footer = () => (
        <div className="container">
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
                <div className="absolute inset-0 container hd:w-7/12 mx-auto flex">
                    <div className="z-10 h-20">
                        <a href="/">
                            <Logo className="text-white mx-auto mt-5" />
                        </a>
                    </div>
                </div>

                <div className="container">
                    <img className="absolute inset-0 flex items-start justify-center mx-auto w-1/2 contain-section__img-man"
                         src="/static/img/man.webp" alt=""/>
                    <img className="absolute inset-0 flex items-start justify-center mx-auto mt-16 w-1/4 contain-section__img-woman"
                         src="/static/img/woman.webp" alt=""/>
                </div>
            </AnimationBackground>
        </>
    );
}


Error.getInitialProps = ({res, err}) => {
    const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
    return {statusCode}
};

Error.getLayout = page => page;

export default Error;
