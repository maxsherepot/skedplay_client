import React from "react";
import Link from "next/link";
import { Button } from "UI";
import { UserSvg, StarSvg, PhotoSvg, VideoSvg } from "icons";
import {useTranslation} from "react-i18next";

const PrivateBox = ({ user }) => {
    const {t, i18n} = useTranslation();

    const employeeButtonText = user.employee
        ? t('common.edit')
        : t('common.add');

    const employeeLink = user.employee
      ? '/account/ad'
      : '/girls/add';

    const counters = [
        {
            counter: "employees_photos",
            title: t('account.photos'),
            icon: "photo",
            buttonText: null
        },
        {
            counter: "employees_videos",
            title: t('account.videos'),
            icon: "video",
            buttonText: null
        }
    ];

    return (
        <>
            <div className="flex flex-wrap -mx-3">
                <div className="px-3 w-full md:w-1/2 hd:w-1/3 mb-5">
                    <div className="p-5 hd:p-10 border-light-grey border rounded-lg hover:border-transparent hover:bg-white shadow hover:cursor-pointer">
                        <div className="flex flex-col justify-center h-full">
                            <div className="flex justify-between">
                                <span className="text-2xl font-bold mb-6">{t('layout.card')} / {t('layout.ad')}</span>
                                <UserSvg />
                            </div>
                            <Link href={employeeLink}>
                                <a>
                                    <Button className="w-2/3" size="sm">
                                        {employeeButtonText}
                                    </Button>
                                </a>
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="px-3 w-full md:w-1/2 hd:w-1/3 mb-5">
                    <div className="p-5 hd:p-10 border-light-grey border rounded-lg hover:border-transparent hover:bg-white shadow hover:cursor-pointer">
                        <div className="flex flex-col justify-center h-full">
                            <div className="flex justify-between">
                                <span className="text-2xl font-bold mb-6">{user.employee.events_count} {t('account.events')}</span>
                                <StarSvg />
                            </div>
                            <Button className="w-2/3" size="sm">
                                {t('navigation.add_new')}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-wrap -mx-3">
                {counters &&
                counters.map(({ counter, title, icon, buttonText }, index) => (
                    <div className="px-3 w-full md:w-1/2 hd:w-1/3 mb-5" key={index}>
                        <div className="p-5 hd:p-10 border-light-grey border rounded-lg hover:border-transparent hover:bg-white shadow hover:cursor-pointer">
                            <div className="flex flex-col justify-center h-full">
                                <div className="flex justify-between">
                                    <span className="text-2xl font-bold mb-6">{`${counter ? user[counter]: ""} ${title}`}</span>
                                    {icon === "photo" ? (
                                        <PhotoSvg />
                                    ) : (
                                        <VideoSvg />
                                    )}
                                </div>
                                {buttonText && (
                                    <Button className="w-2/3" size="sm">
                                        {buttonText}
                                    </Button>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default PrivateBox;
