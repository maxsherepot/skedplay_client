import gql from "graphql-tag";

export const GET_FILTERS_STATE = gql`
  query {
    filters @client {
      girls {
#        location
        services
        gender
        race_type_id
        age {
          from
          to
        }
        orderBy {
          field
          order
        }
      }
      boys {
#        location
        services
        gender
        race_type_id
        age {
            from
            to
        }
        orderBy {
            field
            order
        }
      }
      couple {
#        location
        services
        gender
        race_type_id
        age {
            from
            to
        }
        orderBy {
            field
            order
        }
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
