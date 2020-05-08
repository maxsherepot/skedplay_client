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

const ENTITY_NAME = "events";

function Events({ user, isGeolocationEnabled }) {
  const {t, i18n} = useTranslation();

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

  const fields = helpers.getEventsFilters(cantons, cities, event_types, isGeolocationEnabled, t);

  return (
    <>
      <EntitySearch
        entityName={ENTITY_NAME}
        fields={fields}
        filters={filters}
        Box={EventsBox}
        entityQuery={ALL_EVENTS}
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
