import React from "react";
import { useQuery } from "@apollo/react-hooks";
import checkLoggedIn from "lib/checkLoggedIn";

import { Filter, Loader } from "UI";
import EventsBox from "components/EventsBox";
import { GET_FILTERS_STATE, EVENTS_FILTER_OPTIONS, CANTONS, ALL_EVENTS } from "queries";
import {useTranslation} from "react-i18next";
import { geolocated } from "react-geolocated";
import EntitySearch from "components/EntitySearch";
import ClubsBox from "components/ClubsBox";

const ENTITY_NAME = "events";

function Events({ user, isGeolocationEnabled }) {
  const {t, i18n} = useTranslation();

  const {data: {filters} = {}, loading: filtersLoading, error: filterError} = useQuery(GET_FILTERS_STATE);

  const { loading, data: { event_types } = {} } = useQuery(
    EVENTS_FILTER_OPTIONS
  );

  const { loading: cantonsLoading, data: { cantons } = {} } = useQuery(
    CANTONS
  );

  if (loading || filtersLoading || cantonsLoading) {
    return <Loader/>;
  }

  const fields = [
    {
      component: "multi-select",
      name: "cantons",
      label: t('common.location'),
      showCheckboxes: true,
      placeholder: t('common.all_switzerland'),
      options: [
        ...cantons.map(c => ({value: c.id, label: c.name})),
      ],
    },
    {
      component: "multi-select",
      showCheckboxes: true,
      name: "event_type_ids",
      label: t('events.event_type'),
      placeholder: t('events.select_event_type'),
      options: event_types.map(s => {
        return { label: s.name, value: s.id };
      })
    },
    {
      component: "select",
      name: "date",
      label: t('common.date'),
      placeholder: t('common.select_date'),
      options: []
    }
  ];

  if (isGeolocationEnabled) {
    fields.splice(0, 1);
    fields.splice(fields.length - 1, 0, {
      component: "distance-slider",
      name: "close_to",
      label: t('common.perimeter'),
      initValue: 0,
      valueResolver(value) {
        if (!parseInt(value)) {
          return t('common.off');
        }

        return value + 'km';
      },
      labelResolver(value) {
        if (!parseInt(value)) {
          value = value.distanceKm;
        }

        if (!value) {
          return null;
        }

        return t('common.perimeter') + ' ' + value + 'km';
      }
    });
  }

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
