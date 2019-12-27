import gql from "graphql-tag";

export const GET_FILTERS_STATE = gql`
  query {
    filters @client {
      girls {
#        location
        services
        gender
        race_type_id
      }
      boys {
#        location
        services
        gender
        race_type_id
      }
      couple {
#        location
        services
        gender
        race_type_id
      }
      clubs {
        location
        event_type
        perimeter
      }
      events {
        location
        event_type
        perimeter
        date
      }
    }
  }
`;
