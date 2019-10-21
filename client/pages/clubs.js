import React from "react";
import { useQuery } from "@apollo/react-hooks";
import checkLoggedIn from "lib/checkLoggedIn";
import { Filter } from "UI";
import { MainLayout } from "layouts";
import ClubsBox from "components/ClubsBox";
import { GET_FILTERS_STATE, EVENTS_FILTER_OPTIONS } from "queries";

const ENTITY_NAME = "clubs";

function Clubs({ loggedInUser }) {
  const { loading, data: { club_types } = {} } = useQuery(
    EVENTS_FILTER_OPTIONS
  );

  const { data: { filters } = {} } = useQuery(GET_FILTERS_STATE);

  if (loading) {
    return <div>"Loading..."</div>;
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
    }
  ];

  return (
    <MainLayout user={loggedInUser}>
      <Filter
        name={ENTITY_NAME}
        inititalState={filters[ENTITY_NAME]}
        fields={fields}
      />
      <ClubsBox inititalState={filters[ENTITY_NAME]} />
    </MainLayout>
  );
}

Clubs.getInitialProps = async ctx => {
  const { loggedInUser: user } = await checkLoggedIn(ctx.apolloClient);
  if (!user) {
    return {};
  }
  return { user };
};

Clubs.getLayout = page => page;

export default Clubs;
