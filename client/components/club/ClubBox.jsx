import React from "react";
import { MainLayout } from "layouts";
import { SecondaryNav, ActiveLink } from "UI";
import {useTranslation} from "react-i18next";
import slug from 'slug';

const ClubBox = ({ club, user, children }) => {
  const {t, i18n} = useTranslation();
  const leftInfo = (
    <>
      {club && (
        <div className="flex items-center sm:flex-start mt-5 hd:mt-0">
          <div className="text-3xl font-extrabold hd:text-white">
            {club.name}
          </div>
          <div className="bg-black text-white text-xs rounded-full uppercase mt-1 ml-3 px-3 py-1">
            {club.type.name}
          </div>
        </div>
      )}
    </>
  );

  return (
    <MainLayout user={user}>
      <SecondaryNav left={leftInfo}>
        <ul className="flex -mx-4 text-white">
          <li className="hover:text-red cursor-pointer text-xs sm:text-sm md:text-xl hd:text-2xl px-2 sm:px-5 hd:px-10">
            <ActiveLink
              activeClassName="text-red"
              href={`/clubs/canton/city/id/information?id=${club.id}&canton=${slug(club.city.canton.name)}&city=${slug(club.city.name)}`}
              as={`/clubs/${slug(club.city.canton.name)}/${slug(club.city.name)}/${club.id}/information`}
            >
              <a>{t('clubs.information')}</a>
            </ActiveLink>
          </li>
          <li className="hover:text-red cursor-pointer text-xs sm:text-sm md:text-xl hd:text-2xl px-2 sm:px-5 hd:px-10">
            <ActiveLink
              activeClassName="text-red"
              href={`/clubs/canton/city/id/girls?id=${club.id}&canton=${slug(club.city.canton.name)}&city=${slug(club.city.name)}`}
              as={`/clubs/${slug(club.city.canton.name)}/${slug(club.city.name)}/${club.id}/girls`}
            >
              <a>{t('common.our_girls')}</a>
            </ActiveLink>
          </li>
          <li className="hover:text-red cursor-pointer text-xs sm:text-sm md:text-xl hd:text-2xl px-2 sm:px-5 hd:px-10">
            <ActiveLink
              activeClassName="text-red"
              href={`/clubs/canton/city/id/events?id=${club.id}&canton=${slug(club.city.canton.name)}&city=${slug(club.city.name)}`}
              as={`/clubs/${slug(club.city.canton.name)}/${slug(club.city.name)}/${club.id}/events`}
            >
              <a>{t('layout.events')}</a>
            </ActiveLink>
          </li>
        </ul>
      </SecondaryNav>

      <div className="fluid-container">{children}</div>
    </MainLayout>
  );
};

export default ClubBox;
