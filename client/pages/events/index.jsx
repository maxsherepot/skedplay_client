import { useQuery } from "@apollo/react-hooks";
import checkLoggedIn from "lib/checkLoggedIn";

import { Filter } from "UI";
import { MainLayout } from "layouts";
import EventsBox from "components/EventsBox";
import { GET_FILTERS_STATE, EVENTS_FILTER_OPTIONS } from "queries";

function Events({ loggedInUser }) {
  const { loading, data: { club_types } = {} } = useQuery(
    EVENTS_FILTER_OPTIONS
  );

  const {
    data: { filters: { events } = {} }
  } = useQuery(GET_FILTERS_STATE);

  if (loading) {
    return "Loading...";
  }

  const fields = [
    {
      component: "select",
      name: "location",
      label: "Location",
      placeholder: "Select your location",
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
      label: "Event type",
      placeholder: "Select event type",
      options: club_types.map(s => {
        return { label: s.name, value: s.id };
      })
    },
    {
      component: "select",
      name: "perimeter",
      label: "Perimeter",
      placeholder: "Select perimeter",
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
      label: "Date",
      placeholder: "Select date",
      options: []
    }
  ];

  return (
    <MainLayout user={loggedInUser}>
      <Filter name="events" inititalState={events} fields={fields}></Filter>
      <EventsBox inititalState={events}></EventsBox>
    </MainLayout>
  );
}

Events.getInitialProps = async context => {
  const { loggedInUser } = await checkLoggedIn(context.apolloClient);
  if (!loggedInUser) {
    return {};
  }
  return { loggedInUser };
};

export default Events;
