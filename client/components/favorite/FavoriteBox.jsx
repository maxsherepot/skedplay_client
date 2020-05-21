import React from "react";
import { MainLayout } from "layouts";
import { SecondaryNav, ActiveLink } from "UI";
import {useTranslation} from "react-i18next";

const FavoriteBox = ({ user, children }) => {
  const {t, i18n} = useTranslation();
  const leftInfo = (
    <div className="hidden hd:block text-3xl font-extrabold hd:text-white">
      {t('layout.favorites')}
    </div>
  );

  return (
    <MainLayout user={user}>
      <SecondaryNav left={leftInfo}>
        <ul className="flex -mx-4 text-white">
          <li className="hover:text-red cursor-pointer text-xs sm:text-sm md:text-xl hd:text-2xl px-5 hd:px-10">
            <ActiveLink activeClassName="text-red" href="/favorites/girls">
              <a>{t('layout.girls')}</a>
            </ActiveLink>
          </li>
          <li className="hover:text-red cursor-pointer text-xs sm:text-sm md:text-xl hd:text-2xl px-5 hd:px-10">
            <ActiveLink activeClassName="text-red" href="/favorites/clubs">
              <a>{t('favorite.clubs')}</a>
            </ActiveLink>
          </li>
          <li className="hover:text-red cursor-pointer text-xs sm:text-sm md:text-xl hd:text-2xl px-5 hd:px-10">
            <ActiveLink activeClassName="text-red" href="/favorites/events">
              <a>{t('layout.events')}</a>
            </ActiveLink>
          </li>
        </ul>
      </SecondaryNav>

      <div className="container">{children}</div>
    </MainLayout>
  );
};

export default FavoriteBox;
