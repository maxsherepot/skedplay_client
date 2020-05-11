import React, {useState} from "react";
import {useQuery} from "@apollo/react-hooks";
import checkLoggedIn from "lib/checkLoggedIn";
import {Filter, Loader} from "UI";
import {GET_FILTERS_STATE, EVENTS_FILTER_OPTIONS, CANTONS_AND_CITIES, ALL_CLUBS} from "queries";
import {useTranslation} from "react-i18next";
import {geolocated} from "react-geolocated";
import EntitySearch from "components/EntitySearch";
import ClubsBox from "components/ClubsBox";
import helpers from "UI/Filter/helpers";
import {useRouter} from "next/router";
import ClubsFilterUrl from "../services/ClubsFilterUrl";
import {Router} from "lib/i18n";
import Head from "next/head";

const ENTITY_NAME = "clubs";

function Clubs({user, isGeolocationEnabled}) {
  const {t, i18n} = useTranslation();

  let {query} = useRouter();

  const {loading, data: {club_types} = {}} = useQuery(
    EVENTS_FILTER_OPTIONS
  );

  const {data: {filters} = {}, loading: filtersLoading, error: filterError} = useQuery(GET_FILTERS_STATE);

  const { loading: cantonsLoading, data: { cantons, cities } = {} } = useQuery(
    CANTONS_AND_CITIES
  );

  if (loading || cantonsLoading || filtersLoading) {
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
      <Head>
        {needCanonical && <link rel="canonical" href={`${process.env.APP_URL}${canonical}`}/>}
      </Head>

      <EntitySearch
        entityName={ENTITY_NAME}
        fields={fields}
        initialFilters={initialFilters}
        filters={workFilters}
        Box={ClubsBox}
        entityQuery={ALL_CLUBS}
        redirectByFilters={redirectByFilters}
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
