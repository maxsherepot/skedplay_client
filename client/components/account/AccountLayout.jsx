import React from "react";
import Link from "next/link";
import cx from "classnames";
import {useRouter} from "next/router";
import {Avatar, Button, PageCard} from "UI";
import {getLayout as getMainLayout} from 'layouts'
import {AccountLabel} from "components/account";
import {AddSvg, ChevronDownSvg, ChevronRightSvg} from "icons";

const ProfileHeader = ({user}) => (
    <div className="fluid-container">
        <div className="flex items-center lg:w-7/12 mx-auto py-8">
            <Avatar src="/static/img/Avatar.png"/>
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

const ClubMenu = ({clubs}) => {
    const router = useRouter();
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
                                Sex workers cards
                                <span className="ml-3 py-1 px-3 bg-red text-white text-sm rounded-full">
                                  {(employees && employees.length) || 0}
                                </span>
                            </a>
                        </Link>
                        <Link href="/girls/add">
                            <a className="flex items-center text-black font-normal text-sm p-1 cursor-pointer">
                                <AddSvg/>
                                <span className="ml-2">Add new card</span>
                            </a>
                        </Link>
                        <div className="text-red p-1 cursor-pointer">
                            Archive Sex workers
                        </div>
                        <div className="text-red p-1 cursor-pointer">
                            <Link href={`/${path}/events`} as={`${asPath}/events`}>
                                <a>
                                    Events
                                    <span className="ml-3 py-1 px-3 bg-red text-white text-sm rounded-full">
                                        {(events && events.length) || 0}
                                   </span>
                                </a>
                            </Link>
                        </div>
                        <Link href={`/${path}/edit`} as={`${asPath}/edit`}>
                            <a>
                                <div className="text-red p-1 cursor-pointer">Admin / Edit</div>
                            </a>
                        </Link>
                        <div className="text-red p-1 cursor-pointer">Webpage</div>
                    </div>
                )}
            </div>
        );
    });
};

const Sidebar = ({user: {is_club_owner, is_employee, clubs, employees_events, employees}}) => (
    <div className="flex lg:flex-1 justify-center lg:justify-end w-auto border-divider border-b lg:border-r">
        <div className="flex flex-col py-10 lg:pr-32">
            {is_employee && (
                <div>
                      <span
                          className="text-xl font-medium px-5 py-2 rounded-full hover:bg-pink-100 hover:cursor-pointer">
                        My Ad/Cards
                      </span>
                    <ul className="text-lg text-red font-medium leading-loose ml-10 mt-4">
                        <li>
                            <Link href="/girls/add">
                                <a>
                                    Add new AD+
                                </a>
                            </Link>
                        </li>
                        <li>
                            <Link href="/account/ad">
                                <a>
                                    Active AD
                                    <span className="ml-3 py-1 px-3 bg-red text-white text-sm rounded-full">
                                        {employees.length}
                                    </span>
                                </a>
                            </Link>
                        </li>
                        <li>Archive</li>
                    </ul>
                </div>
            )}

            {is_employee && (
                <div className="mt-5">
                  <span className="text-xl font-medium px-5 py-2 rounded-full hover:bg-pink-100 hover:cursor-pointer">
                    My Events
                  </span>
                    <ul className="text-lg text-red font-medium leading-loose ml-10 mt-4">
                        <li>
                            <Link href="/account/events/create">
                                <a>
                                    Add new Event
                                </a>
                            </Link>
                        </li>
                        <li>
                            <Link href="/account/events">
                                <a>
                                    Active Events
                                    <span className="ml-3 py-1 px-3 bg-red text-white text-sm rounded-full">
                                        {employees_events}
                                    </span>
                                </a>
                            </Link>
                        </li>
                        <li>Archive</li>
                    </ul>
                </div>
            )}

            {is_club_owner && (
                <>
                    <div className="text-2xl font-extrabold px-5 mt-5">
                        You have {clubs.length} clubs
                    </div>

                    <ClubMenu clubs={clubs}/>

                    <Link href="/clubs/add">
                        <a className="ml-5 mt-5">
                            <Button className="px-8" size="sm">
                                Add new club
                            </Button>
                        </a>
                    </Link>
                </>
            )}

            {is_club_owner && (
                <div className="text-2xl font-extrabold px-5 mt-5">Menu</div>
            )}

            <div className="mt-4">
                <span className="text-xl font-medium px-5 py-2 rounded-full hover:bg-pink-100 hover:cursor-pointer">
                  Bills and usage
                </span>
            </div>

            <div className="mt-4">
                <span className="text-xl font-medium px-5 py-2 rounded-full hover:bg-pink-100 hover:cursor-pointer">
                  Messages / Chats
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
                        Settings
                    </a>
                </Link>
            </div>
        </div>
    </div>
);

const AccountLayout = ({contentClass, user, children}) => {
    return (
        <>
            <ProfileHeader user={user}/>
            <PageCard>
                <div className="flex flex-col lg:flex-row justify-between">
                    <Sidebar user={user}/>
                    <div className={cx(contentClass ? contentClass : "lg:w-3/5 lg:ml-10 px-8 py-12")}>
                        {children}
                    </div>
                </div>
            </PageCard>
        </>
    );
};

export const getLayout = (page, initialProps) => getMainLayout(
    <AccountLayout {...initialProps}>{page}</AccountLayout>, initialProps);

export default AccountLayout;
