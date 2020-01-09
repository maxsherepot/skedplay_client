import React, { useState } from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import redirect from "lib/redirect";
import { useApolloClient } from "@apollo/react-hooks";
import { AddSvg, ProfileSvg } from "icons";
import { Avatar, MenuDropdown, Button } from "UI";
import { AccountLabel } from "components/account";
import { setCookie } from "utils";
import {useTranslation} from "react-i18next";

const UserDropdown = ({ user }) => {
  const { t, i18n } = useTranslation();
  const client = useApolloClient();
  const [isUserMenu, toggleUserMenu] = useState(false);

  const signOut = () => {
    setCookie("token", "", {
      "max-age": -1
    });

    client.clearStore().then(() => redirect({}, "/"));
  };

  return (
    <>
      <a
        className="menu-icons__item hovered menu-icons__item_last hidden sm:block cursor-pointer"
        onClick={() => toggleUserMenu(!isUserMenu)}
      >
        <ProfileSvg />
        {user.name}
      </a>
      <MenuDropdown
        className="w-user-dropdown m-5"
        open={isUserMenu}
        toggle={toggleUserMenu}
      >
        <div className="flex justify-between p-7">
          <Avatar src="/static/img/Avatar-2.png" />
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
            <div className="flex items-center">
              <div className="mr-2">{t('common.plan')}: {t('common.free')}</div>
              <div className="bg-transparent hover:bg-pink hover:text-white border border-red rounded-full text-xs ml-4 px-2-5 leading-loose cursor-pointer">
                {t('common.upgrade')}
              </div>
            </div>
          </div>
        </div>

        <div className="border-b border-divider" />

        <div className="flex flex-wrap justify-between px-7 py-4">
          <div className="w-1/2">
            {(user.is_employee || user.is_club_owner) && (
              <Link href="/account">
                <a className="block text-red font-medium hover:text-pink cursor-pointer mb-2">
                  {t('layout.view_my_account')}
                </a>
              </Link>
            )}
            {(user.is_employee || user.is_club_owner) && (
              <div className="text-red font-medium hover:text-pink cursor-pointer mb-2">
                {t('common.bills_and_usage')}
              </div>
            )}
            {user.is_client && (
              <div className="text-red font-medium hover:text-pink cursor-pointer mb-2">
                {t('common.my_favorites')}
              </div>
            )}
            <div className="text-red font-medium hover:text-pink cursor-pointer mb-2">
              {t('common.messages_chats')}
            </div>
            {user.is_employee &&  user.employee && user.employee.reviews.length !== 0 && (
              <div className="text-red font-medium hover:text-pink cursor-pointer">
                {t('common.reviews')}
              </div>
            )}
          </div>
          <div className="w-1/2">
            {user.is_club_owner && (
              <div className="text-red font-medium mb-2 hover:text-pink cursor-pointer">
                {t('common.my_clubs')}
              </div>
            )}
            {user.is_club_owner && (
              <div className="flex items-center mb-2">
                <Link href="/clubs/add">
                  <a className="flex items-center cursor-pointer">
                    <AddSvg /> <span className="ml-2">{t('common.add_new_club')}</span>
                  </a>
                </Link>
              </div>
            )}
            {(user.is_employee || user.is_club_owner) && (
              <div className="flex items-center mb-2">
                <AddSvg /> <span className="ml-2">{t('common.add_new_ad')}</span>
              </div>
            )}
            {(user.is_employee || user.is_club_owner) && (
              <div className="flex items-center">
                <AddSvg />
                <span className="ml-2">{t('common.add_new_event')}</span>
              </div>
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
