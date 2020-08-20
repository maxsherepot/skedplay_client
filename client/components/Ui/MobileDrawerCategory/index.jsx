import React from 'react';
import Link from 'components/SlashedLink'
import { Lang, MobileDrawer, Button } from "UI";
import {useTranslation} from "react-i18next";


function MobileDrawerCategory({user, isOpen, onClose}) {
    const { t, i18n } = useTranslation();

    return (
        <MobileDrawer isOpen={isOpen} onClose={onClose}>
            <div className="mobile-drawer-category container">
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
            </div>
        </MobileDrawer>
    );
}


export default MobileDrawerCategory;
