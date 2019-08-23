import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import { EventsGallery } from "UI";

const GET_EVENTS = gql`
  {
    events(count: 5) {
      data {
        id
        title
        short_title
        photos {
          id
          thumb_url
        }
        type {
          id
          name
        }
        club {
          address
        }
      }
    }
  }
`;

function EventsBox() {
  const {
    loading,
    error,
    data: { events }
  } = useQuery(GET_EVENTS);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  if (events) return <EventsGallery events={events.data} />;

}

export default EventsBox;
