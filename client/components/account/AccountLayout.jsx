import React, {useContext, useEffect, useState} from "react";
import Link from "next/link";
import Router, {useRouter} from "next/router";
import {Avatar, Button, PageCard, FileField} from "UI";
import { UPLOAD_USER_AVATAR} from "queries/userQuery";
import { GET_ME } from "queries/userQuery";

import {getLayout as getMainLayout} from 'layouts';
import {getErrors, defaultSchedule} from "utils";
import {AccountLabel} from "components/account";
import {AddSvg, ChevronDownSvg, ChevronRightSvg} from "icons";
import {useMutation, useQuery} from "@apollo/react-hooks";
import {GET_MY_EMPLOYEE_EVENTS_COUNT} from 'queries';
import {useTranslation} from "react-i18next";
import AddPhotoSvg from "components/icons/AddPhotoSvg";
import {Loader} from 'UI';

const ProfileHeader = ({user}) => (
    <div className="fluid-container">
        <div className="flex items-center lg:w-7/12 ml-8 py-8">
            <CheckAvatar />
            <div className="ml-4">
                <span className="text-2xl font-medium capitalize">{user.name}</span>
                <div className="flex mt-4">
                    <AccountLabel {...user} />
                    <span className="sm:ml-2">{user.phone}</span>
                </div>
            </div>
        </div>
    </div>
);

const CheckAvatar = () => {
    const [uploadUserAvatar] = useMutation(UPLOAD_USER_AVATAR);
    const {
        data: { me } = {},
        loading
    } = useQuery(GET_ME);

    if (loading) {
        return <Loader/>;
    }

    const handleChange = async fileEvent => {
        try {
            const [avatar] = fileEvent.target.files;

            await uploadUserAvatar({
                variables: {
                    avatar: avatar,
                    collection: 'user-avatar'
                },
            });

            Router.reload();

        } catch (e) {
            const errors = getErrors(e);
            return {
                status: false,
                message: "Server error",
                errors
            };
        }
    };

    return (
        <>
            <div className={`c-account__avatar-wrap ${me && me.avatar ? '' : 'c-account__avatar--empty'}`}>
                {me && me.avatar ? <img className="c-account__avatar" src={me.avatar.url}/> : '' }
                <label htmlFor="fileUpload" className="c-account__avatar-plus">
                    <AddPhotoSvg/>
                </label>
                <input className="c-account__avatar-input" type="file" id="fileUpload" onChange={handleChange}/>
            </div>
        </>
    );
};

const ClubMenu = ({clubs}) => {
    const router = useRouter();

    const {t, i18n} = useTranslation();

    return clubs.map(({id, name, employees, events}) => {
        const path = '/account/club/:cid';
        const asPath = `/account/club/${id}`;

        const isActive = router.asPath.includes(asPath);

        return (
            <div key={id}>
                <span className="flex items-center text-xl font-medium px-5 py-2 hover:cursor-pointer">
                  {isActive ? <ChevronDownSvg/> : <ChevronRightSvg/>}
                    <Link href={path} as={asPath}>
                        <a>
                            <span className="truncate ml-4">{name}</span>
                        </a>
                    </Link>
                </span>
                {isActive && (
                    <div className="ml-12 font-medium">
                        {/* Add ActiveLink with special class! */}

                        <Link href={`/${path}/workers`} as={`${asPath}/workers`}>
                            <a className="text-red p-1 cursor-pointer">
                                {t('account.sex_workers_cards')}
                                <span className="ml-3 py-1 px-3 bg-red text-white text-sm rounded-full">
                                  {(employees && employees.length) || 0}
                                </span>
                            </a>
                        </Link>
                        <Link href={`/account/club/${id}/workers/add`}>
                            <a className="flex items-center text-black font-normal text-sm p-1 cursor-pointer">
                                <AddSvg/>
                                <span className="ml-2">{t('layout.add_new_card')}</span>
                            </a>
                        </Link>
                        <div className="text-red p-1 cursor-pointer">
                            {t('layout.archive_sex_workers')}
                        </div>
                        <div className="text-red p-1 cursor-pointer">
                            <Link href={`/${path}/events`} as={`${asPath}/events`}>
                                <a>
                                    {t('layout.events')}
                                    <span className="ml-3 py-1 px-3 bg-red text-white text-sm rounded-full">
                                        {(events && events.length) || 0}
                                   </span>
                                </a>
                            </Link>
                        </div>
                        <Link href={`/${path}/edit`} as={`${asPath}/edit`}>
                            <a>
                                <div className="text-red p-1 cursor-pointer">{t('layout.admin')} / {t('layout.edit')}</div>
                            </a>
                        </Link>
                        <div className="text-red p-1 cursor-pointer">{t('layout.webpage')}</div>
                    </div>
                )}
            </div>
        );
    });
};

const Sidebar = ({user: {is_club_owner, is_employee, clubs, employees_events, employees, employee}}) => {
    const {t, i18n} = useTranslation();
    const employeeButtonText = employee
      ? t('layout.edit_ad')
      : t('layout.add_ad');

    const employeeLink = employee
      ? '/account/ad'
      : '/girls/add';

    const { loading: userCountsLoading, error: userCountsError, data: { me: userCounts } = {} } = useQuery(GET_MY_EMPLOYEE_EVENTS_COUNT);

    return (
      <div className="flex lg:flex-1 justify-center lg:justify-end w-auto border-divider border-b lg:border-r">
          <div className="flex flex-col py-10 lg:pr-32">
              {is_employee && (
                <div>
                      <span
                        className="text-xl font-medium px-5 py-2 rounded-full hover:bg-pink-100 hover:cursor-pointer"
                      >
                        <Link href={employeeLink}>
                          <a>
                              {employeeButtonText}
                          </a>
                        </Link>
                      </span>
                </div>
              )}

              {is_employee && (
                <div className="mt-5">
                  <span className="text-xl font-medium px-5 py-2 rounded-full hover:bg-pink-100 hover:cursor-pointer">
                      {t('layout.my_events')}
                  </span>
                    <ul className="text-lg text-red font-medium leading-loose ml-10 mt-4">
                        <li>
                            <Link href="/account/events/create">
                                <a>
                                    {t('layout.add_new_event')}
                                </a>
                            </Link>
                        </li>
                        <li>
                            <Link href="/account/events">
                                <a>
                                  {t('layout.active_events')}
                                    {(!userCountsLoading && userCounts) &&
                                      <span className="ml-3 py-1 px-3 bg-red text-white text-sm rounded-full">
                                          {userCounts.employees_events}
                                      </span>
                                    }
                                </a>
                            </Link>
                        </li>
                        <li>{t('layout.archive')}</li>
                    </ul>
                </div>
              )}

              {is_club_owner && (
                <>
                    <div className="text-2xl font-extrabold px-5 mt-5">
                        {t('layout.you_have')} {clubs.length} {t('layout.clubs')}
                    </div>

                    <ClubMenu clubs={clubs}/>

                    <Link href="/clubs/add">
                        <a className="ml-5 mt-5">
                            <Button className="px-8" size="sm">
                                {t('layout.add_new_club')}
                            </Button>
                        </a>
                    </Link>
                </>
              )}

              {is_club_owner && (
                <div className="text-2xl font-extrabold px-5 mt-5">{t('layout.menu')}</div>
              )}

              <div className="mt-4">
                <span className="text-xl font-medium px-5 py-2 rounded-full hover:bg-pink-100 hover:cursor-pointer">
                  {t('layout.bills_and_usage')}
                </span>
              </div>

              <div className="mt-4">
                <span className="text-xl font-medium px-5 py-2 rounded-full hover:bg-pink-100 hover:cursor-pointer">

                  <Link href="/account/messages-and-chats">
                      <a>
                        {t('layout.messages')} / {t('layout.chats')}
                      </a>
                  </Link>
                </span>
              </div>

              {/*{employee && employee.reviews && employee.reviews.length !== 0 && (*/}
              {/*    <div className="mt-4">*/}
              {/*      <span className="text-xl font-medium px-5 py-2 rounded-full hover:bg-pink-100 hover:cursor-pointer">*/}
              {/*        Reviews*/}
              {/*      </span>*/}
              {/*    </div>*/}
              {/*)}*/}

              <div className="mt-4">
                  <Link href="/account/settings">
                      <a className="text-xl font-medium px-5 py-2 rounded-full hover:bg-pink-100 hover:cursor-pointer">
                          {t('layout.settings')}
                      </a>
                  </Link>
              </div>
          </div>
      </div>
    );
};

const AccountLayout = ({contentClass, user, className, children}) => {
    const getClass = () => {
        if (className) return className;
        if (contentClass) return contentClass;

        return "lg:w-3/5 lg:ml-10 px-8 py-12";
    };

    return (
        <>
            <ProfileHeader user={user}/>
            <PageCard>
                <div className="flex flex-col lg:flex-row justify-between">
                    <Sidebar user={user}/>
                    <div className={getClass()}>
                        {children}
                    </div>
                </div>
            </PageCard>
        </>
    );
};

export const getLayout = (page, initialProps) => getMainLayout(
    <AccountLayout {...initialProps}>{page}</AccountLayout>,
    initialProps
);

export default AccountLayout;
