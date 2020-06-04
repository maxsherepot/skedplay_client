import React from "react";
import Link from 'components/SlashedLink'
import redirect from "lib/redirect";
import {useRouter} from "next/router";
import {Avatar, Button} from "UI";
import checkLoggedIn from "lib/checkLoggedIn";
import {getLayout} from "components/account/AccountLayout";
import {PhotoSvg, StarSvg, UserSvg, VideoSvg} from "icons";
import {useTranslation} from "react-i18next";

const GirlRow = ({ employee, soon, active }) => {
    const {t, i18n} = useTranslation();

    return (
      <div className="flex items-center my-2">
          <Avatar className="w-10 h-10 mr-2" src="/static/img/Avatar.webp" />

          <div className="flex-col ml-2">
              <div className="font-medium">{employee && employee.name}</div>
              {!active ? (
                <div className="flex items-center text-grey">
                    {!soon && (
                      <span className="block bg-dark-green h-2 w-2 mr-2 rounded-full" />
                    )}
                    <div className="flex items-center">
                        05.06-07.06
                        {soon && (
                          <div className="bg-black text-white text-xs rounded-full whitespace-no-wrap px-3 py-1 ml-2">
                              {t('common.coming_soon')}
                          </div>
                        )}
                    </div>
                </div>
              ) : (
                <div className="flex items-center">
                    <div className="bg-light-grey text-white text-xs rounded-full whitespace-no-wrap px-3 py-1">
                        {t('common.not_active')}
                    </div>
                    <div className="bg-transparent border-2 border-red text-black text-xs font-medium rounded-full whitespace-no-wrap px-3 py-1 ml-3">
                        {t('common.active_now')}
                    </div>
                </div>
              )}
          </div>
      </div>
    );
};

const AccountClubIndex = ({ user }) => {
    const {t, i18n} = useTranslation();

    let phone = null;
    const router = useRouter();
    let { cid } = router.query;
    cid = cid.replace('/', '');

    const getClubs = (clubs, id) => {
        if (id && (clubs && clubs.length > 0)) {
            const index = clubs.map(c => c.id).indexOf(id);

            if (index !== -1) return clubs[index]
        }

        return null;
    };

    const club = getClubs(user.clubs, cid);

    if (!club) return null;

    if (club && club.phones) {
        phone = JSON.parse(club.phones)
    }

    const { admin } = club;

    return (
        <>
            <div className="flex items-center">
                <div className="text-3xl font-extrabold">{club.name}</div>
                <div className="bg-dark-green text-white text-xs rounded-full uppercase mt-1 ml-3 px-3 py-1">
                    {club.type.name}
                </div>
            </div>
            <div className="flex items-center my-3">
                {phone && (<div className="mr-4 text-grey text-xs">{phone}</div>)}
                {admin && (<div className="text-grey text-xs">Admin: {admin.name}</div>)}
            </div>
            <div className="relative flex flex-col hd:w-2/3 border border-divider rounded-lg p-5">
                <div className="absolute inset-0 flex justify-end m-10">
                    <UserSvg />
                </div>

                <span className="text-2xl font-extrabold">{club.employees.length || 0} {t('account.sex_workers')}</span>
                <div className="flex">
                    <div className="flex flex-col w-1/2">
                        <span className="text-xl font-medium">{t('account.my_cards')}</span>

                        {club.employees.map(employee => (
                            <GirlRow key={employee.id} employee={employee} />
                        ))}
                    </div>
                    <div className="flex flex-col w-1/2">
                        <span className="text-xl font-medium">{t('account.another')}</span>

                        {/*<GirlRow soon />*/}
                        {/*<GirlRow active />*/}
                    </div>
                </div>

                <div className="flex mt-3">
                    <Link href={`/account/club/${cid}/workers/add`}>
                        <a>
                            <Button className="px-12 mr-4" size="sm">
                                {t('common.add_new')}
                            </Button>
                        </a>
                    </Link>
                    {(club.employees.length > 0) && (
                        <Link href={`/account/club/${cid}/workers`}>
                            <a>
                                <Button className="px-12" size="sm" outline style={{ color: "#000" }}>
                                    {t('common.edit')}
                                </Button>
                            </a>
                        </Link>
                    )}
                </div>
            </div>

            <div className="flex flex-wrap -mx-3 mt-5">
                <div className="px-3 w-full md:w-1/2 hd:w-1/3 mb-5">
                    <div className="h-full p-5 border-light-grey border rounded-lg hover:border-transparent hover:bg-white shadow hover:cursor-pointer">
                        <div className="flex flex-col justify-between h-full">
                            <div className="flex justify-between">
                                <span className="text-2xl font-extrabold mb-6">{club.events_count} {t('account.event')}</span>
                                <StarSvg />
                            </div>
                            <Link href={`/account/club/${club.id}/events/create`}>
                                <a>
                                    <Button className="w-2/3" size="sm">
                                        {t('common.add_new_event')}
                                    </Button>
                                </a>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col px-3 w-full md:w-1/2 hd:w-1/3 mb-5">
                    <div className="p-5 border-light-grey border rounded-lg hover:border-transparent hover:bg-white shadow hover:cursor-pointer mb-6">
                        <div className="flex flex-col justify-center">
                            <div className="flex justify-between">
                                <span className="text-2xl font-extrabold mb-6">{t('account.count_photos', {count: club.photos_count})}</span>
                                <PhotoSvg />
                            </div>
                        </div>
                    </div>
                    <div className="p-5 border-light-grey border rounded-lg hover:border-transparent hover:bg-white shadow hover:cursor-pointer">
                        <div className="flex flex-col justify-center">
                            <div className="flex justify-between">
                                <span className="text-2xl font-extrabold mb-6">{t('account.count_videos', {count: club.videos_count})}</span>
                                <VideoSvg />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

AccountClubIndex.getInitialProps = async ctx => {
    const { loggedInUser: user } = await checkLoggedIn(ctx.apolloClient);
    if (!user) {
        redirect(ctx, "/login");
    }
    return { user };
};

AccountClubIndex.getLayout = getLayout;

export default AccountClubIndex;
