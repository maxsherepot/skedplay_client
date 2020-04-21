import React from "react";
import {useTranslation} from "react-i18next";
import Link from "next/link";

const PrivateBox = ({ user }) => {
    const {t, i18n} = useTranslation();

    let clubs = user.clubs.filter(club =>
        !club.photos.length || !club.employees.length || !club.schedule.length
    );

    return (
        <div>
            {clubs.map(club => (
                <div className="row">
                    <div className="my-2 inline-block">
                        {t('account.you_added_club_please_add', {name: `${club.name}`})}
                        {!club.photos.length && (!club.schedule.length || !club.employees.length ? ` ${t('account.photos')}, ` : ` ${t('account.photos')} `) }
                        {!club.schedule.length && (!club.employees.length ? ` ${t('account.schedule')}, ` : ` ${t('account.schedule')} `)}
                        {!club.employees.length && ` ${t('account.your_workers')} `}
                        {t('account.in_club')}.
                    </div>
                    <div className="inline-block">
                        <div className="">
                            <Link href={`/account/club/${club.id}/edit`}>
                                <a>
                                    <button
                                        className="ml-3 bg-white border border-xs border-red text-red px-3 py-1 hover:bg-red hover:text-white rounded-full"
                                    >
                                        {t('account.do_it_now')}
                                    </button>
                                </a>
                            </Link>
                        </div>
                    </div>
                </div>

            ))}
        </div>
    );
};

export default PrivateBox;
