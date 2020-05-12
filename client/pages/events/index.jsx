import React from "react";
import { useQuery } from "@apollo/react-hooks";
import checkLoggedIn from "lib/checkLoggedIn";

import { Loader } from "UI";
import EventsBox from "components/EventsBox";
import { GET_FILTERS_STATE, EVENTS_FILTER_OPTIONS, CANTONS_AND_CITIES, ALL_EVENTS } from "queries";
import {useTranslation} from "react-i18next";
import { geolocated } from "react-geolocated";
import EntitySearch from "components/EntitySearch";
import helpers from "UI/Filter/helpers";
import EventsFilterUrl from "services/EventsFilterUrl";
import {useRouter} from "next/router";
import {Router} from "lib/i18n";
import Head from "next/head";

const ENTITY_NAME = "events";

function Events({ user, isGeolocationEnabled }) {
  const {t, i18n} = useTranslation();
  let {query} = useRouter();

  const {data: {filters} = {}, loading: filtersLoading, error: filterError} = useQuery(GET_FILTERS_STATE);

  const { loading, data: { event_types } = {} } = useQuery(
    EVENTS_FILTER_OPTIONS
  );

  const { loading: cantonsLoading, data: { cantons, cities } = {} } = useQuery(
    CANTONS_AND_CITIES
  );

  if (loading || filtersLoading || cantonsLoading) {
    return <Loader/>;
  }

  const eventsFilterUrl = new EventsFilterUrl(
    query,
    {cantons, cities, types: event_types}
  );

  if (eventsFilterUrl.pageNotFound()) {
    const err = new Error();
    err.code = 'ENOENT';
    throw err;
  }

  const fields = helpers.getEventsFilters(cantons, cities, event_types, isGeolocationEnabled, t);

  const initialFilters = JSON.parse(JSON.stringify(filters));
  const workFilters = JSON.parse(JSON.stringify(filters));

  workFilters[ENTITY_NAME] = eventsFilterUrl.setFilters(workFilters[ENTITY_NAME]);

  const redirectByFilters = (filters) => {
    let {url, as} = eventsFilterUrl.getRouterParams(filters);

    Router.replace(url, as, {shallow: true});
  };

  const {as: canonical, needCanonical} = eventsFilterUrl.getRouterParams(workFilters[ENTITY_NAME], true);

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
        Box={EventsBox}
        entityQuery={ALL_EVENTS}
        redirectByFilters={redirectByFilters}
      />
    </>
  );
}

Events.getInitialProps = async ctx => {
  const { loggedInUser: user } = await checkLoggedIn(ctx.apolloClient);
  if (!user) {
    return {};
  }
  return { user };
};

let geoLocatedPage = geolocated()(Events);

geoLocatedPage.getInitialProps = async ctx => {
  const { loggedInUser: user } = await checkLoggedIn(ctx.apolloClient);

  if (!user) {
    return {};
  }
  return { user };
};

export default geoLocatedPage;
