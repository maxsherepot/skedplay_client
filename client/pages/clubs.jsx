import React, {useState} from "react";
import {useQuery} from "@apollo/react-hooks";
import checkLoggedIn from "lib/checkLoggedIn";
import {Filter, Loader} from "UI";
import {GET_FILTERS_STATE, EVENTS_FILTER_OPTIONS, CANTONS_AND_CITIES, ALL_CLUBS, GET_PAGE} from "queries";
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

const ENTITY_NAME = "clubs";

function Clubs({user, isGeolocationEnabled}) {
  const {t, i18n} = useTranslation();

  let {query} = useRouter();

  const { data: { page } = {}, loading: pageLoading} = useQuery(GET_PAGE, {
    variables: {
      key: 'clubs'
    }
  });

  const {loading, data: {club_types} = {}} = useQuery(
    EVENTS_FILTER_OPTIONS
  );

  const {data: {filters} = {}, loading: filtersLoading, error: filterError} = useQuery(GET_FILTERS_STATE);

  const { loading: cantonsLoading, data: { cantons, cities } = {} } = useQuery(
    CANTONS_AND_CITIES
  );

  if (pageLoading || loading || cantonsLoading || filtersLoading) {
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
        title={translation.getLangField(page.title, i18n.language)}
        description={translation.getLangField(page.description, i18n.language)}
        keywords={translation.getLangField(page.keywords, i18n.language)}
        canonical={needCanonical ? `${process.env.APP_URL}${canonical}` : null}
      />

      <EntitySearch
        header={translation.getLangField(page.header, i18n.language)}
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
