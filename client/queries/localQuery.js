import gql from "graphql-tag";

export const GET_FILTERS_STATE = gql`
  query {
    filters @client {
      girls {
#        location
        type
        active
        cantons
        services
        gender
        user_status
        status
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
        active
        isVip
        services
        cantons
        gender
        user_status
        status
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
        active
        services
        cantons
        gender
        user_status
        status
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
        start_time
        user_status
        status
        orderBy {
           field
           order
        }
#        perimeter
      }
      events {
        cantons
        user_status
        status
        event_type
#        perimeter
        date
      }
    }
  }
`;
