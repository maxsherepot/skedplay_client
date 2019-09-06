import gql from "graphql-tag";

export const ALL_SERVICES = gql`
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
