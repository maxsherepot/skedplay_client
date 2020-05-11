import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import { EventsGallery, Loader } from "UI";

const GET_EVENTS = gql`
  {
    events(first: 5, filters: {status: 1, user_status: 1}) {
      data {
        id
        title
        short_title
        city {
          id
          name
          canton {
              id
              name
          }
        }
        status
        user_status
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
          city {
              id
              name
              canton {
                  id
                  name
              }
          }
        }
      }
    }
  }
`;

function EventsBox() {
  const { loading, error, data: { events } = {} } = useQuery(GET_EVENTS);

  if (loading) return <Loader/>;
  if (error) return <div>{error.message}</div>;

  if (events) return <EventsGallery events={events.data} />;
}

export default EventsBox;
