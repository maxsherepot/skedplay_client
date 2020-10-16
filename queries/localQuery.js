import gql from "graphql-tag";

export const GET_FILTERS_STATE = gql`
  query {
    filters @client {
      girls {
#        location
        type
#        active
        show_level
        canton_id
        city_id
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
#        active
        show_level
        isVip
        services
        canton_id
        city_id
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
#        active
        show_level
        services
        canton_id
        city_id
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
        canton_id
        city_id
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
        canton_id
        city_id
        user_status
        status
        event_type
#        perimeter
        date
      }
    }
  }
`;
