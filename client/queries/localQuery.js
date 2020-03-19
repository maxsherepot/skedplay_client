import gql from "graphql-tag";

export const GET_FILTERS_STATE = gql`
  query {
    filters @client {
      girls {
#        location
        type
        cantons
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
      vip_escort {
#        location
        type
        services
        cantons
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
      trans {
#        location
        type
        services
        cantons
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
        cantons
        club_type
#        perimeter
      }
      events {
        cantons
        event_type
#        perimeter
        date
      }
    }
  }
`;
