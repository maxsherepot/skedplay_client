import React from 'react';
import Link from 'components/SlashedLink'
import { useApolloClient } from "@apollo/react-hooks";
import { Avatar, Lang, MobileDrawer, Button } from "UI";
import {useTranslation} from "react-i18next";
import { AccountLabel } from "components/account";
import { setCookie } from "utils";
import Cookies from 'js-cookie';



function MobileDrawerMenu({user, isOpen, onClose}) {
    const client = useApolloClient();

    const signOut = () => {
      Cookies.remove('token', { path: '' });

      setCookie("token", "", {
        "max-age": -1
      });

      client.clearStore().then(() => redirect({}, "/"));
    };

    const { t, i18n } = useTranslation();



    return (
        <MobileDrawer isOpen={isOpen} onClose={onClose}>
            <div className="mobile-drawer-menu container">
                {
                    user ?
                    <div className="flex flex-col items-center justify-center pt-6 pb-6">
                      <Avatar/>
                      <div className="mt-2">
                        {user && user.is_employee ? (
                          <span className="text-2xl font-medium capitalize">
                            {user.employee.name} {user.age ? `, ${user.age}` : ''}
                          </span>
                        ) : (
                          <span className="text-2xl font-medium capitalize">
                            {user.name} {user.age ? `, ${user.age}` : ''}
                          </span>
                        )}
                        <div className="profile-info-box flex flex-col items-center justify-center mt-2">
                          <AccountLabel {...user} />
                          <span className="profile-phone sm:ml-2 mt-2">{user.phone}</span>
                        </div>
                      </div>
                    </div>
                    :
                    null
                }
              <div className="divider mb-4"></div>
              {(user && user.is_club_owner) &&
                <Link href="/clubs/add">
                  <Button className="w-full mt-4"
                          level="secondary-light"
                          size="xs"
                          onClick={onClose}>
                      {t('common.add_new_club')}
                  </Button>
                </Link>
              }
              {(user && user.is_employee && !user.employee) &&
                <Link href="/girls/add">
                  <Button className="w-full mt-4"
                          level="secondary-light"
                          size="xs"
                          onClick={onClose}>
                      {t('common.add_new_ad')}
                  </Button>
                </Link>
              }
              {(user && user.is_employee && user.employee) &&
                <Link href="/account/ad">
                    <Button className="w-full mt-4"
                            level="secondary-light"
                            size="xs"
                            onClick={onClose}>
                        {t('layout.edit_ad')}
                    </Button>
                </Link>
              }
              {user ? (
                <Link href="/account" as={`/account`}>
                  <Button className="w-full mt-4"
                          level="black-light"
                          size="xs"
                          onClick={onClose}>
                      {t('common.my_account')}
                  </Button>
                </Link>
              ) : (
                <>
                    <Link href="/register">
                        <Button
                          className="w-full px-4 mt-8"
                          size="sm"
                        >
                          {t('common.sign_up')}
                        </Button>
                    </Link>
                  <Link href="/login">
                      <Button
                        className="w-full px-8 my-6 mb-6"
                        size="sm"
                        level="black"
                      >
                        {t('common.login')}
                      </Button>
                  </Link>
                </>
              )}
              {
                  user ?
                      <Button className="w-full mt-4 mb-6"
                              level="black-light"
                              size="xs"
                              onClick={() => {onClose(); signOut()}}>
                          {t('common.sign_out')}
                      </Button>
                      :
                      null
              }
              <Lang mobile={true} />
            </div>
        </MobileDrawer>
    );
}


export default MobileDrawerMenu;
