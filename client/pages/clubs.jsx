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

const ENTITY_NAME = "clubs";

function Clubs({user, isGeolocationEnabled}) {
  const {t, i18n} = useTranslation();

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

  const fields = helpers.getClubsFilters(cantons, cities, club_types, isGeolocationEnabled, t);

  return (
    <>
      <EntitySearch
        entityName={ENTITY_NAME}
        fields={fields}
        filters={filters}
        Box={ClubsBox}
        entityQuery={ALL_CLUBS}
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
