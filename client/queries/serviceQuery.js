import gql from "graphql-tag";

export const GIRLS_FILTER_OPTIONS = gql`
  query options {
    services {
      id
      name
    }

    employee_race_types {
      id
      name
    }
  }
`;

export const GET_SERVICES = gql`
  query services {
    services {
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
    }
  }
`;
