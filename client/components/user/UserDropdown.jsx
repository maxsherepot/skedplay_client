import React, { useState } from "react";
import PropTypes from "prop-types";
import Link from 'components/SlashedLink'
import redirect from "lib/redirect";
import { useApolloClient } from "@apollo/react-hooks";
import { AddSvg, ProfileSvg } from "icons";
import { Avatar, MenuDropdown, Button, FavoritesCount } from "UI";
import { AccountLabel } from "components/account";
import { setCookie } from "utils";
import {useTranslation} from "react-i18next";
import Cookies from 'js-cookie';

const UserDropdown = ({ user }) => {

  const client = useApolloClient();
  const [isUserMenu, toggleUserMenu] = useState(false);

  const signOut = () => {
    Cookies.remove('token', { path: '' });

    setCookie("token", "", {
      "max-age": -1
    });

    client.clearStore().then(() => redirect({}, "/"));
  };

  const { t, i18n } = useTranslation();

  return (
    <>
      <a
        className="menu-icons__item hovered menu-icons__item_last last hidden sm:block cursor-pointer"
        onClick={() => toggleUserMenu(!isUserMenu)}
      >
        <ProfileSvg />
        {user.name}
      </a>
      <MenuDropdown
        className="w-user-dropdown m-5 z-1"
        open={isUserMenu}
        toggle={toggleUserMenu}
      >
        <div className="flex justify-between p-7">
          <div className="c-account__avatar-wrap">
            <Avatar />
          </div>
          <div className="flex flex-col flex-1 ml-4">
            <div className="flex items-center">
              <div className="text-2xl font-medium capitalize">{user.name}</div>
              <div className="text-lg text-red ml-4">
                <Link href="/account">
                  <a>{t('layout.view_profile')}</a>
                </Link>
              </div>
            </div>
            <div className="flex items-center my-2">
              <div>
                <AccountLabel {...user} />
              </div>
              <div className="ml-4">{user.phone}</div>
            </div>
            {/*<div className="flex items-center">
              <div className="mr-2">{t('common.plan')}: {t('common.free')}</div>
              <Link href="/plans">
                <div className="bg-transparent hover:bg-pink hover:text-white border border-red rounded-full text-xs ml-4 px-2-5 leading-loose cursor-pointer">
                  {t('common.upgrade')}
                </div>
              </Link>
            </div>*/}
          </div>
        </div>

        <div className="border-b border-divider" />

        <div className="flex flex-wrap justify-between px-7 py-4">
          <div className="w-1/2">
            {/*{(user.is_employee || user.is_club_owner) && (*/}
            {/*  <div className="text-red font-medium hover:text-pink cursor-pointer mb-2">*/}
            {/*    {t('common.bills_and_usage')}*/}
            {/*  </div>*/}
            {/*)}*/}
            {user.is_client && (
              <Link href="/favorites/girls">
                <a className="text-red font-medium hover:text-pink cursor-pointer mb-2">
                  {t('common.my_favorites')} (<FavoritesCount/>)
                </a>
              </Link>
            )}
            {!user.is_club_owner &&
              <Link href="/account/messages-and-chats">
                <div className="text-red font-medium hover:text-pink cursor-pointer mb-2">
                  {t('common.messages_chats')} ({user.is_employee ? user.employee.unread_messages_count || 0 : user.unread_messages_count || 0})
                </div>
              </Link>
            }
            {user.is_employee &&  user.employee && user.employee.reviews.length !== 0 && (
              <div className="text-red font-medium hover:text-pink cursor-pointer">
                {t('common.reviews')}
              </div>
            )}

            {user.is_club_owner &&
            <>
              {user.clubs && user.clubs.length > 0 ? (
                <div>
                  {user.clubs.map(club =>
                    <Link href={`/account/club/cid?cid=${club.id}`} as={`/account/club/${club.id}`} key={club.id}>
                      <a className="hover:text-red flex m-1 hover:cursor-pointer">
                        {club.name}
                      </a>
                    </Link>
                  )}
                </div>
              ) : (
                <div>
                  <span>
                    {t('account.add_your_first_club')}
                  </span>
                </div>
              )}
            </>}
          </div>
          <div className="w-1/2">
            {/*{user.is_club_owner && (*/}
            {/*  <div className="text-red font-medium mb-2 hover:text-pink cursor-pointer">*/}
            {/*    {t('common.my_clubs')}*/}
            {/*  </div>*/}
            {/*)}*/}
            {(user.is_employee && !user.employee) && (
              <Link href="/girls/add">
                <a className="flex items-center mb-2">
                  <AddSvg /> <span className="ml-2">{t('common.add_new_ad')}</span>
                </a>
              </Link>
            )}
            {/*{(user.is_employee && user.employee) && (*/}
            {/*  <Link href="/account/ad">*/}
            {/*    <a className="flex items-center mb-2">*/}
            {/*      <AddSvg /> <span className="ml-2">{t('layout.edit_ad')}</span>*/}
            {/*    </a>*/}
            {/*  </Link>*/}
            {/*)}*/}
            {user.is_employee && (
              <>
                <Link href="/account">
                  <a className="flex hover:text-red cursor-pointer mb-2">
                    {t('layout.view_my_account')}
                  </a>
                </Link>
                <Link href="/account/events/create">
                  <a className="flex items-center">
                    <AddSvg />
                    <span className="ml-2">{t('common.add_new_event')}</span>
                  </a>
                </Link>
              </>
            )}
            {user.is_club_owner && (
                <>
                  <Link href="/account">
                    <a className="flex hover:text-red cursor-pointer mb-2">
                      {t('layout.view_my_account')}
                    </a>
                  </Link>
                  <Link href="/clubs/add">
                    <a className="flex items-center">
                      <AddSvg />
                      <span className="ml-2">{t('common.add_new_club')}</span>
                    </a>
                  </Link>
              </>
            )}
          </div>
        </div>

        <div className="border-b border-divider" />

        <div className="flex flex-wrap justify-between px-7 py-4">
          <Button
            className="w-32"
            outline
            size="xs"
            style={{ color: "black" }}
            onClick={signOut}
          >
            {t('common.sign_out')}
          </Button>
        </div>
      </MenuDropdown>
    </>
  );
};

UserDropdown.propTypes = {
  user: PropTypes.object.isRequired
};

export default UserDropdown;
