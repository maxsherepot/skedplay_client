import React from "react";
import { MainLayout } from "layouts";
import { SecondaryNav, ActiveLink, Loader, Breadcrumbs } from "UI";
import {useTranslation} from "react-i18next";
// import slug from 'slug';
import {useQuery} from "@apollo/react-hooks";
import {GET_PAGE} from 'queries';
import translation from "services/translation";

const ClubBox = ({ club, user, children, lastBreadcrumbs }) => {
  const {t, i18n} = useTranslation();

  const { data: { page } = {}, loading: pageLoading} = useQuery(GET_PAGE, {
    variables: {
      key: 'clubs'
    }
  });

  if (pageLoading) {
    return <Loader/>
  }

  const cityFilter = process.env.CITY_FILTER !== 'true'
    ? []
    : [
      {
        as: `/clubs/${club.city.canton.slug}/${club.city.slug}`,
        href: `/clubs/canton/city?canton=${club.city.canton.slug}&city=${club.city.slug}`,
        label: club.city.name
      }
    ];

  let breadcrumbs = [
    {
      as: `/clubs`,
      href: `/clubs`,
      label: translation.getLangField(page.header, i18n.language)
    },
    {
      as: `/clubs/${club.city.canton.slug}`,
      href: `/clubs/canton?&canton=${club.city.canton.slug}`,
      label: club.city.canton.name
    },
    ...cityFilter,
    {
      as: `/clubs/${club.city.canton.slug}/${club.city.slug}/${club.id}/information`,
      href: `/clubs/canton/city/id/information?id=${club.id}&canton=${club.city.canton.slug}&city=${club.city.slug}`,
      label: club.name
    },
  ];

  if (lastBreadcrumbs) {
    breadcrumbs = [...breadcrumbs, ...lastBreadcrumbs]
  }

  const leftInfo = (
    <>
      {club && (
        <div className="flex items-center sm:flex-start hd:mt-0">
          <h1 className="text-2xl font-extrabold">
            {club.name}
          </h1>
          <div className="bg-black text-white text-xs rounded-full uppercase mt-1 ml-3 px-3 py-1">
            {club.type.name}
          </div>
        </div>
      )}
    </>
  );

  return (
    <MainLayout user={user}>
      <SecondaryNav
        left={leftInfo}
        breadcrumbs={
          <Breadcrumbs
            items={breadcrumbs}
          />
        }
      >
        <ul className="flex -mx-4 text-white">
          <ActiveLink
            activeClassName="text-black"
            href={`/clubs/canton/city/id/information?id=${club.id}&canton=${club.city.canton.slug}&city=${club.city.slug}`}
            as={`/clubs/${club.city.canton.slug}/${club.city.slug}/${club.id}/information`}
          >
            <a>{t('clubs.information')}</a>
          </ActiveLink>

          <ActiveLink
            activeClassName="text-black"
            href={`/clubs/canton/city/id/girls?id=${club.id}&canton=${club.city.canton.slug}&city=${club.city.slug}`}
            as={`/clubs/${club.city.canton.slug}/${club.city.slug}/${club.id}/girls`}
          >
            <a>{t('common.our_girls')}</a>
          </ActiveLink>

          <ActiveLink
            activeClassName="text-black"
            href={`/clubs/canton/city/id/events?id=${club.id}&canton=${club.city.canton.slug}&city=${club.city.slug}`}
            as={`/clubs/${club.city.canton.slug}/${club.city.slug}/${club.id}/events`}
          >
            <a>{t('layout.events')}</a>
          </ActiveLink>
        </ul>
      </SecondaryNav>

      <div className="container">{children}</div>
    </MainLayout>
  );
};

export default ClubBox;
