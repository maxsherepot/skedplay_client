import React from "react";
import Link from 'components/SlashedLink'
import { Button } from "UI";
import { UserSvg, StarSvg, PhotoSvg, VideoSvg } from "icons";
import {useTranslation} from "react-i18next";
import FavoriteSvg from "components/icons/FavoriteSvg";
import { FavoritesCount } from "UI";

const ClientBox = ({ user }) => {
    const {t, i18n} = useTranslation();

    return (
        <>
            <div className="flex flex-wrap -mx-3">
                <div className="px-3 w-full md:w-1/2 hd:w-1/3 mb-5">
                    <div className="p-5 hd:p-10 border-light-grey border rounded-lg hover:border-transparent hover:bg-white shadow hover:cursor-pointer">
                        <div className="flex flex-col justify-center h-full">
                            <div className="flex justify-between">
                                <a href="/favorites/girls">
                                    <span className="text-2xl font-bold mb-6">
                                        <FavoritesCount/> {t('common.favorites')}
                                     </span>
                                </a>
                                <FavoriteSvg />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ClientBox;
