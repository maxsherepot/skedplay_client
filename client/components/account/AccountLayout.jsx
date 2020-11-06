import React, {useContext, useEffect, useState} from "react";
import Link from 'components/SlashedLink'
import Router, {useRouter} from "next/router";
import {Avatar, SecondaryNav, Button, PageCard, Loader} from "UI";
import {getLayout as getMainLayout} from 'layouts';
import {AccountLabel} from "components/account";
import {AddSvg, ChevronDownSvg, ChevronRightSvg} from "icons";
import {useApolloClient, useMutation, useQuery} from "@apollo/react-hooks";
import {GET_MY_EMPLOYEE_EVENTS_COUNT, GET_MY_EMPLOYEES, SETTINGS} from 'queries';
import {useTranslation} from "react-i18next";
import {UPLOAD_VERIFY_PHOTO} from "queries/userQuery";
import {getErrors} from "utils/index";
import * as moment from "moment";
import AlertTriangleSvg from "components/icons/AlertTriangleSvg";
import cx from "classnames";
import Cookies from "js-cookie";
import redirect from "lib/redirect";
import { setCookie } from "utils";
import AddGirlLinkWrap from "components/account/AddGirlLinkWrap";

export const ProfileHeader = ({user}) => {
  const avatar = user && user.avatar ? user.avatar.thumb_url : null;

  return (
      <>
        {user && (user.is_employee || user.is_club_owner) && user.status === 0 && (
            <VerifyMessage user={user}/>
        )}
        <div className="container header-profile-div">
          <div className="flex items-center justify-center ml:pl-0 md:pr-20 lg:pr-7 lg:pl-0 xl:pl-15 xl:pr-15 lg:w-7/12 py-8">
            <Avatar className="w-10 h-10 mr-2" isEmpty={!avatar} src={avatar}/>
            <div className="ml-4">
              <span className="text-2xl font-medium capitalize">
                {user.name} {user.age ? `, ${user.age}` : ''}
              </span>
              <div className="profile-info-box flex mt-4">
                  <div className="flex">
                      <AccountLabel {...user} />
                  </div>
                <span className="profile-phone sm:ml-2">{user.phone}</span>
              </div>
            </div>
          </div>
        </div>
      </>
    )
};

const VerifyMessage = ({user}) => {
  const {t} = useTranslation();
  const [uploadVerifyPhoto] = useMutation(UPLOAD_VERIFY_PHOTO);
  let date, time;

  if (user.verify_photo) {
    let dateUploadPhoto = user.verify_photo['created_at'];

    date = moment(new Date(dateUploadPhoto.slice(0, 10)), 'YYYY-MM-DD').format('DD-MM-YYYY');
    time = dateUploadPhoto.slice(11, 16);
  }

  const handleSubmit = async verifyFile => {
    try {
      const [verify_photo] = verifyFile.target.files;

      await uploadVerifyPhoto({
        variables: {
          verify_photo: verify_photo,
          collection: 'verify-photo'
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

  return null

  return (
    <>
      {user.verify_photo ? (
       <div className="flex flex-row pl-3 items-center verify-message-div__message">
         <div className="flex items-center justify-center md:pl-0 md:pr-0 lg:pr-0 lg:pl-0 xl:pl-15 sm:pl-0 xl:pr-15 lg:w-full">
          <div className="ml-3 py-2">
            <span className="font-bold flex flex-col">
              {t('account.added_verify_photo', {date: `${date}`, time: `${time}`})}
            </span>
          </div>
         </div>
       </div>
      ) : (
      <div className="flex flex-row pl-3 items-center verify-message-div__add">
       <div className="flex items-center justify-center w-full xl:pl-15 xl:pr-15">
        <div className="ml-3 py-2 w-full">
          <div className="xs:column sm:flex sm:flex-row">
            <div className="xs:justify-center sm:justify-end align-middle flex flex-row msg-verify__div w-full">
              <div>
                <span className="inline-block mr-2 py-2">
                    <AlertTriangleSvg/>
                  </span>
              </div>
              <div className="flex flex-col">
                <span className="font-bold inline-block">{t('account.verify_your_account')}</span>
                <span className="">{t('account.add_pass_or_photo')}</span>
              </div>
            </div>
            <div className="py-4 my-auto w-full xs:justify-center sm:justify-start btn-verify__div">
              <label htmlFor="verifyFile" className="inline-block">
              <span
                className="bg-red border border-xs border-red text-white text-xxs rounded-full px-4 py-2 md:ml-3 sm:ml-1
                           sm:px-3 sm:py-2 md:px-6 md:py-2 hover:cursor-pointer">
                {t('account.upload_verify_photo')}
              </span>
              </label>
              <input
                className="c-account__avatar-input"
                type="file"
                id="verifyFile"
                name="Upload Verify Photo"
                onChange={handleSubmit}
              />
            </div>
          </div>
        </div>
       </div>
      </div>
      )}
    </>
  )

};

const ClubMenuItem = ({club: {id, name, employees, events}}) => {
  const {t, i18n} = useTranslation();
  const router = useRouter();

  const path = `/account/club/cid`;
  const asPath = `/account/club/${id}`;

  const clubQueryParams = `?cid=${id}`;

  const isActive = router.asPath.includes(asPath);

  const [open, setOpen] = useState(isActive);

  const toggle = () => {
    setOpen(!open);
  };

  return (
    <div>
      <span className="flex items-center text-xl font-medium px-5 py-2 hover:cursor-pointer">
        <div
          className={cx([
            'inline-block transition',
          ])}
          style={{
            transform: !open ? 'none' : 'rotate(-90deg)'
          }}
        >
          <ChevronDownSvg/>
        </div>


        {!!open || !!isActive ?
          // <span
          //   onClick={() => toggle()}
          //   className="truncate ml-4 hover:text-black focus:text-black"
          // >
          //   {name}
          // </span>

          <Link
            href={`/account`}
            scroll={false}
          >
            <a onClick={() => toggle()}>
              <span
                className="truncate ml-4 hover:text-black focus:text-black"
              >
                {name}
              </span>
            </a>
          </Link>
          :
          <Link
            href={path + clubQueryParams}
            as={asPath}
            scroll={false}
          >
            <a onClick={() => toggle()}>
              <span
                className="truncate ml-4 hover:text-black focus:text-black"
              >
                {name}
              </span>
            </a>
          </Link>
        }
      </span>

      <div
        className={cx([
          "transition overflow-hidden ml-12 font-medium",
          open ? `py-2` : '',
        ])}
        style={{
          height: open ? `140px` : '0',
        }}
      >
        {/* Add ActiveLink with special class! */}

        <Link href={`${path}/workers${clubQueryParams}`} as={`${asPath}/workers`}>
          <a className="text-red p-1 cursor-pointer hover:text-black focus:text-black">
            {t('account.sex_workers_cards')}
            <span className="ml-3 py-1 px-3 bg-red text-white text-sm rounded-full">
                  {(employees && employees.length) || 0}
                </span>
          </a>
        </Link>
        <Link href={`${path}/workers/add${clubQueryParams}`} as={`${asPath}/workers/add`}>
          <a
            className="flex items-center text-red font-normal text-sm p-1 cursor-pointer hover:text-black focus:text-black">
            <AddSvg/>
            <span className="ml-2">{t('layout.add_new_card')}</span>
          </a>
        </Link>
        {/*<div className="text-red p-1 cursor-pointer">
              {t('layout.archive_sex_workers')}
            </div>*/}
        <div className="text-red p-1 cursor-pointer  hover:text-black focus:text-black">
          <Link href={`${path}/events${clubQueryParams}`} as={`${asPath}/events`}>
            <a>
              {t('layout.events')}
              <span className="ml-3 py-1 px-3 bg-red text-white text-sm rounded-full">
                {(events && events.length) || 0}
              </span>
            </a>
          </Link>
        </div>
        <Link href={`${path}/edit${clubQueryParams}`} as={`${asPath}/edit`}>
          <a>
            <div
              className="text-red p-1 cursor-pointer hover:text-black focus:text-black">{t('layout.admin')} / {t('layout.edit')}</div>
          </a>
        </Link>
      </div>
    </div>
  );
};

const ClubMenu = ({clubs}) => {
  return clubs.map((club) => {
    return <ClubMenuItem club={club} key={club.id}/>
  });
};

export const Sidebar = ({user: {is_club_owner, is_moderator, is_employee, clubs, moderated_clubs, employees_events},onClose}) => {
  const {t, i18n} = useTranslation();
  const client = useApolloClient();

  if (is_moderator) {
    clubs = moderated_clubs;
  }

  const {loading: employeesLoading, data} = useQuery(GET_MY_EMPLOYEES, {
    skip: !is_employee
  });
  const {loading: userCountsLoading, error: userCountsError, data: {me: userCounts} = {}} = useQuery(GET_MY_EMPLOYEE_EVENTS_COUNT, {
    skip: !is_employee
  });

  const employees = (data && data.me && data.me.employees) || [];

  const signOut = () => {
    Cookies.remove('token', { path: '' });

    setCookie("token", "", {
      "max-age": -1
    });

    client.clearStore().then(() => redirect({}, "/"));
  };

  return (
    <div className="account-layout-sidebar hidden sm:flex lg:flex-1 justify-center lg:justify-end w-auto border-divider border-b lg:border-r">
      {(employeesLoading) && <Loader/>}
      <div className="flex flex-col py-10 lg:pr-20 xl:pr-20 scale">
        {is_employee &&
          <>
            <span className="text-xl font-medium px-5 py-2 rounded-full hover:bg-pink-100 hover:cursor-pointer">
              My Ad/Cards
            </span>

            <div>
              <ul className="text-lg font-medium leading-loose ml-10 mt-4">
                {!employeesLoading &&
                  <>
                    {employees.map(employee => (
                      <li 
                      onClick={onClose}
                      key={employee.id}>
                        <Link
                          as={`/account/ad/${employee.id}`}
                          href={`/account/ad/eid/?eid=${employee.id}`}
                        >
                          <a 
                          className="text-red hover:text-black focus:text-black">
                            {employee.name}
                          </a>
                        </Link>
                      </li>
                    ))}

                    <AddGirlLinkWrap employeesCount={employees.length}>
                      <li 
                      onClick={onClose}
                      className="hover:text-black focus:text-black">
                        <Link href="/girls/add">
                          <a className="border_dashed">
                            {t('layout.add_new_card')}
                          </a>
                        </Link>
                      </li>
                    </AddGirlLinkWrap>
                  </>
                }
              </ul>
            </div>
          </>
        }

        {is_employee && (
          <div className="mt-5">
            <span className="text-xl font-medium px-5 py-2 rounded-full hover:bg-pink-100 hover:cursor-pointer">
                {t('layout.my_events')}
            </span>
            <ul className="text-lg font-medium leading-loose ml-10 mt-4">
              <li 
              onClick={onClose}
              className="hover:text-black focus:text-black">
                <Link href="/account/events/create">
                  <a className="border_dashed">
                    {t('layout.add_new_event')}
                  </a>
                </Link>
              </li>
              <li 
              onClick={onClose}
              className="hover:text-black text-red focus:text-black">
                <Link href="/account/events">
                  <a>
                    {t('layout.events_archive')}
                    {(!userCountsLoading && userCounts) &&
                      <span className="ml-3 py-1 px-3 bg-red text-white text-sm rounded-full">
                        {userCounts.employees_events}
                      </span>
                    }
                  </a>
                </Link>
              </li>
              {/*<li>{t('layout.archive')}</li>*/}
            </ul>
          </div>
        )}

        {(is_club_owner || is_moderator) && (
          <>
            <div className="text-2xl font-bold px-5 mt-5">
              {t('layout.you_have')} {clubs.length} {t('layout.clubs')}
            </div>

            <ClubMenu clubs={clubs}/>

            {!is_moderator &&
              <Link href="/clubs/add">
                <a className="ml-5 mt-5">
                  <Button className="px-8" size="sm">
                    {t('layout.add_new_club')}
                  </Button>
                </a>
              </Link>
            }
          </>
        )}

        {(is_club_owner || is_moderator) && (
          <div className="text-2xl font-bold px-5 mt-5">{t('layout.menu')}</div>
        )}

        {/*<div className="mt-4">
                <span className="text-xl font-medium px-5 py-2 rounded-full hover:bg-pink-100 hover:cursor-pointer">
                  {t('layout.bills_and_usage')}
                </span>
              </div>*/}

        {!is_moderator &&
          <div className="mt-4">
            <span 
            onClick={onClose}
            className="text-xl font-medium px-5 py-2 rounded-full hover:bg-pink-100 hover:cursor-pointer">
                <Link href="/account/messages-and-chats/chat">
                  <a>
                    {t('layout.messages')} / {t('layout.chats')}
                  </a>
                </Link>
            </span>
          </div>
        }

        {/*{employee && employee.reviews && employee.reviews.length !== 0 && (*/}
        {/*    <div className="mt-4">*/}
        {/*      <span className="text-xl font-medium px-5 py-2 rounded-full hover:bg-pink-100 hover:cursor-pointer">*/}
        {/*        Reviews*/}
        {/*      </span>*/}
        {/*    </div>*/}
        {/*)}*/}

        <div className="mt-4">
          <Link href="/account/settings">
            <a 
            onClick={onClose}
            className="text-xl font-medium px-5 py-2 rounded-full hover:bg-pink-100 hover:cursor-pointer">
              {t('layout.settings')}
            </a>
          </Link>
        </div>

        <div className="mt-4">
            <span
              className="text-xl text-grey font-medium px-5 py-2 rounded-full hover:bg-pink-100 hover:cursor-pointer"
              onClick={() => signOut()}
            >
              {t('common.sign_out')}
            </span>
        </div>
      </div>
    </div>
  );
};

const AccountLayout = ({contentClass, user, className, children}) => {
  const getClass = () => {
    if (className) return className;
    if (contentClass) return contentClass;

    return "lg:w-3/5 lg:ml-10 px-4 py-6 sm:py-12";
  };

  return (
    <>
      <div className="hidden sm:block">
          <ProfileHeader user={user}/>
      </div>
      <div className="my-4 sm:hidden">
          <SecondaryNav className="bg-transparent">
          </SecondaryNav>
      </div>
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
