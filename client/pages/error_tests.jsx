import React from 'react'
import Link from 'next/link'
import {
    Logo,
    Button,
    AnimationBackground,
} from "UI";
import {useTranslation} from "react-i18next";

function ErrorTest() {
    const {t, i18n} = useTranslation();

    const DisplayServerError = () => (
        <div className="flex flex-col items-start mx-auto hd:w-7/12">
            <h1 className="text-4xl font-extrabold">{t('errors.error_occurred')}</h1>
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
            <div className="fluid-container">
                <img className="absolute inset-0 flex items-start justify-center mx-auto w-1/2 error-section__main-info-img"
                     src="/static/img/man.png" alt=""/>
                <img className="absolute inset-0 flex items-start justify-center mx-auto mt-16 w-1/4 error-section__main-info-img"
                     src="/static/img/woman.png" alt=""/>
            </div>
        </div>
    );

    return (
        <>
            <div className="absolute inset-0 fluid-container hd:w-7/12 mx-auto flex">
                <div className="">
                    <Logo className="text-white mx-auto mt-5" />
                </div>
            </div>
            <DisplayServerError/>
        </>
    );
}
export default ErrorTest;