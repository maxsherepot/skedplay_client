import gql from "graphql-tag";

export const GIRLS_FILTER_OPTIONS = gql`
  query options {
    services {
      id
      name
      slug
    }

    employee_race_types {
      id
      name
      slug
    }
  }
`;

export const GET_SERVICES = gql`
    query services {
        services {
            id
            name
            slug
            group {
                id
                name
            }
        }
    }
`;

export const GET_GROUP_SERVICES = gql`
    query groupServices {
        groupServices {
            id
            name
        }
    }
`;

export const EVENTS_FILTER_OPTIONS = gql`
  query options {
    club_types {
        id
        name
        slug
    }
    event_types {
      id
      name
      slug
    }
  }
`;

export const EVENT_TYPES = gql`
    query eventTypes {
        event_types {
            id
            name
            display_name
        }
    }
`;
