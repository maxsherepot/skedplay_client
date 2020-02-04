import React from "react";
import { useQuery } from "@apollo/react-hooks";
import checkLoggedIn from "lib/checkLoggedIn";

import { Filter, Loader } from "UI";
import EventsBox from "components/EventsBox";
import { GET_FILTERS_STATE, EVENTS_FILTER_OPTIONS } from "queries";
import {useTranslation} from "react-i18next";


function Events({ user }) {
  const {t, i18n} = useTranslation();

  const { loading, data: { club_types } = {} } = useQuery(
    EVENTS_FILTER_OPTIONS
  );

  const {
    data: { filters: { events } = {} }
  } = useQuery(GET_FILTERS_STATE);

  if (loading) {
    return <Loader/>;
  }

  const fields = [
    {
      component: "select",
      name: "location",
      label: t('common.location'),
      placeholder: t('common.select_location'),
      options: [
        {
          label: "Zürich",
          value: "zürich"
        },
        {
          label: "Geneva",
          value: "geneva"
        },
        {
          label: "Basel",
          value: "basel"
        },
        {
          label: "Lausanne",
          value: "lausanne"
        },
        {
          label: "Bern",
          value: "bern"
        },
        {
          label: "Winterthur",
          value: "winterthur"
        },
        {
          label: "Lucerne",
          value: "lucerne"
        }
      ]
    },
    {
      component: "select",
      name: "event_type",
      label: t('clubs.event_type'),
      placeholder: t('event.select_event_type'),
      options: club_types.map(s => {
        return { label: s.name, value: s.id };
      })
    },
    {
      component: "select",
      name: "perimeter",
      label: t('clubs.perimeter'),
      placeholder: t('clubs.select_perimeter'),
      options: [
        {
          label: "2 km",
          value: 2
        },
        {
          label: "5 km",
          value: 5
        },
        {
          label: "10 km",
          value: 10
        },
        {
          label: "20 km",
          value: 20
        }
      ]
    },
    {
      component: "select",
      name: "date",
      label: t('common.date'),
      placeholder: t('common.select_date'),
      options: []
    }
  ];

  return (
    <>
      <Filter name="events" inititalState={events} fields={fields} setFilters={() => {}} />
      <EventsBox inititalState={events} />
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

export default Events;
