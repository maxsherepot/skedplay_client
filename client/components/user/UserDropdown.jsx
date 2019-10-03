import React, { useState } from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import redirect from "lib/redirect";
import { useApolloClient } from "@apollo/react-hooks";
import { AddSvg, ProfileSvg } from "icons";
import { Avatar, MenuDropdown, Button } from "UI";
import { AccountLabel } from "components/account";
import { setCookie } from "utils";

const UserDropdown = ({ user }) => {
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
        className="menu-icons__item menu-icons__item_last hidden sm:block cursor-pointer"
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
              <div className="text-2xl font-medium">{user.name}</div>
              <div className="text-lg text-red ml-4">
                <Link href="/account/[id]" as={`/account/${user.id}`}>
                  <a>View profile</a>
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
              <div className="mr-2">Plan: free</div>
              <div className="bg-transparent hover:bg-pink hover:text-white border border-red rounded-full text-xs ml-4 px-2-5 leading-loose cursor-pointer">
                Upgrade
              </div>
            </div>
          </div>
        </div>

        <div className="border-b border-divider"></div>

        <div className="flex flex-wrap justify-between px-7 py-4">
          <div className="w-1/2">
            {(user.is_employee || user.is_club_owner) && (
              <Link href="/account/[id]" as={`/account/${user.id}`}>
                <a className="block text-red font-medium hover:text-pink cursor-pointer mb-2">
                  View my account
                </a>
              </Link>
            )}
            {(user.is_employee || user.is_club_owner) && (
              <div className="text-red font-medium hover:text-pink cursor-pointer mb-2">
                Bills and Usage
              </div>
            )}
            {user.is_client && (
              <div className="text-red font-medium hover:text-pink cursor-pointer mb-2">
                My Favorites
              </div>
            )}
            <div className="text-red font-medium hover:text-pink cursor-pointer mb-2">
              Messages / Chats
            </div>
            {(user.is_employee || user.is_club_owner) && (
              <div className="text-red font-medium hover:text-pink cursor-pointer">
                Reviews
              </div>
            )}
          </div>
          <div className="w-1/2">
            {user.is_club_owner && (
              <div className="text-red font-medium mb-2 hover:text-pink cursor-pointer">
                My clubs
              </div>
            )}
            {user.is_club_owner && (
              <div className="flex items-center mb-2">
                <AddSvg /> <span className="ml-2">Add new Club</span>
              </div>
            )}
            {(user.is_employee || user.is_club_owner) && (
              <div className="flex items-center mb-2">
                <AddSvg /> <span className="ml-2">Add new AD</span>
              </div>
            )}
            {(user.is_employee || user.is_club_owner) && (
              <div className="flex items-center">
                <AddSvg />
                <span className="ml-2">Add new Event</span>
              </div>
            )}
          </div>
        </div>

        <div className="border-b border-divider"></div>

        <div className="flex flex-wrap justify-between px-7 py-4">
          <Button
            className="w-32"
            outline
            size="xs"
            style={{ color: "black" }}
            onClick={signOut}
          >
            Sign out
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
