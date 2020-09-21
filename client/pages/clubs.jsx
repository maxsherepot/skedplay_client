import React, {useState} from "react";
import {useQuery} from "@apollo/react-hooks";
import checkLoggedIn from "lib/checkLoggedIn";
import {Filter, Loader} from "UI";
import {GET_FILTERS_STATE, ALL_CLUBS, CLUBS_PAGE_DATA, CLUBS_SEO} from "queries";
import {useTranslation} from "react-i18next";
import {geolocated} from "react-geolocated";
import EntitySearch from "components/EntitySearch";
import ClubsBox from "components/ClubsBox";
import helpers from "UI/Filter/helpers";
import {useRouter} from "next/router";
import ClubsFilterUrl from "../services/ClubsFilterUrl";
import {Router} from "lib/i18n";
import translation from "services/translation";
import { NextSeo } from 'next-seo';
import initFiltersData from "lib/initFiltersData";

const ENTITY_NAME = "clubs";

function Clubs({user, isGeolocationEnabled}) {
  const {t, i18n} = useTranslation();

  let {query} = useRouter();

  if (query.canton) {
    query.canton = query.canton.replace('/', '');
  }

  if (query.city) {
    query.city = query.city.replace('/', '');
  }

  const { data: { page, club_types, cantons, cities } = {}, loading} = useQuery(CLUBS_PAGE_DATA, {
    variables: {
      key: 'clubs'
    }
  });

  const { loading: seoLoading, data: { clubsSeo } = {} } = useQuery(
    CLUBS_SEO,
    {
      variables: {
        input: {
          canton: query.canton || null,
          city: query.city || null,
          types: query.types || [],
        }
      }
    }
  );

  const filters = initFiltersData;

  if (loading || seoLoading) {
    return <Loader/>;
  }

  const clubsFilterUrl = new ClubsFilterUrl(
    query,
    {cantons, cities, types: club_types}
  );

  if (clubsFilterUrl.pageNotFound()) {
    const err = new Error();
    err.code = 'ENOENT';
    throw err;
  }

  const initialFilters = JSON.parse(JSON.stringify(filters));
  const workFilters = JSON.parse(JSON.stringify(filters));

  workFilters[ENTITY_NAME] = clubsFilterUrl.setFilters(workFilters[ENTITY_NAME]);

  const fields = helpers.getClubsFilters(cantons, cities, club_types, isGeolocationEnabled, t);

  const redirectByFilters = (filters) => {
    let {url, as} = clubsFilterUrl.getRouterParams(filters);

    Router.replace(url, as, {shallow: true});
  };

  const {as: canonical, needCanonical} = clubsFilterUrl.getRouterParams(workFilters[ENTITY_NAME], true);

  return (
    <>
      <NextSeo
        title={translation.getLangField(clubsSeo.title || page.title, i18n.language)}
        description={translation.getLangField(clubsSeo.description || page.description, i18n.language)}
        canonical={needCanonical ? `${process.env.APP_URL}${canonical}` : null}

        additionalMetaTags={[{
          name: 'keywords',
          content: translation.getLangField(clubsSeo.keywords || page.keywords, i18n.language)
        }]}
      />

      <EntitySearch
        header={translation.getLangField(clubsSeo.h1 || page.header, i18n.language)}
        rootHeader={translation.getLangField(page.header, i18n.language)}
        entityName={ENTITY_NAME}
        fields={fields}
        initialFilters={initialFilters}
        filters={workFilters}
        Box={ClubsBox}
        entityQuery={ALL_CLUBS}
        redirectByFilters={redirectByFilters}
        entityFilterUrl={clubsFilterUrl}
      />
    </>
  );
}

let geoLocatedPage = geolocated()(Clubs);

geoLocatedPage.getInitialProps = async ctx => {
  const {loggedInUser: user} = await checkLoggedIn(ctx.apolloClient);

  if (!user) {
    return {};
  }
  return {user};
};

export default geoLocatedPage;
