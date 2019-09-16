import gql from "graphql-tag";

export const GET_CURRENT_REGISTER_STEP = gql`
  query {
    steps {
      register @client
      forgot @client
      newAdd @client
    }
  }
`;

export const GET_FILTERS_STATE = gql`
  query {
    filters @client {
      girls {
        location
        services
        gender
        race_type
      }
      boys {
        location
        services
        gender
        race_type
      }
      couple {
        location
        services
        gender
        race_type
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
