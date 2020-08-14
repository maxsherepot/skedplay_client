import React from 'react';
import Link from 'components/SlashedLink'
import { Lang, MobileDrawer, Button } from "UI";
import {useTranslation} from "react-i18next";


function MobileDrawerMenu({user, isOpen, onClose}) {
    const { t, i18n } = useTranslation();

    return (
        <MobileDrawer isOpen={isOpen} onClose={onClose}>
            <div className="mobile-drawer-menu container">
              <ul>
                <li onClick={onClose}>
                  <Link href="/girls">
                    <a>{t('common.girls')}</a>
                  </Link>
                </li>
                <li onClick={onClose}>
                  <Link href="/trans">
                    <a>{t('common.trans')}</a>
                  </Link>
                </li>
                <li onClick={onClose}>
                  <Link href="/clubs">
                    <a>{t('common.clubs')}</a>
                  </Link>
                </li>
                <li onClick={onClose}>
                  <Link href="/events">
                    <a>{t('common.events')}</a>
                  </Link>
                </li>
                <li onClick={onClose}>
                  <Link href="/vip-escort">
                    <a>{t('common.vip')}</a>
                  </Link>
                </li>
              </ul>
              <div className="divider"></div>
              {(user && user.is_club_owner) &&
                <Link href="/clubs/add">
                  <a>
                    <Button className="w-full text-2xl mt-1" onClick={onClose}>{t('common.add_new_club')}</Button>
                  </a>
                </Link>
              }
              {(user && user.is_employee && !user.employee) &&
                <Link href="/girls/add">
                  <a>
                    <Button className="w-full text-2xl mt-1" onClick={onClose}>{t('common.add_new_ad')}</Button>
                  </a>
                </Link>
              }
              {(user && user.is_employee && user.employee) &&
                <Link href="/account/ad">
                  <a>
                    <Button className="w-full text-2xl mt-1 mt-8" onClick={onClose}>{t('layout.edit_ad')}</Button>
                  </a>
                </Link>
              }
              {user ? (
                <Link href="/account" as={`/account`}>
                  <a onClick={onClose} className="block text-center transition tracking-tighter  text-2xl font-medium my-8">
                    {t('common.my_account')}
                  </a>
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
              <Lang mobile={true} />
            </div>
        </MobileDrawer>
    );
}


export default MobileDrawerMenu;
