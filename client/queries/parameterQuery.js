import gql from "graphql-tag";

export const GET_EMPLOYEE_PARAMETERS = gql`
  query options {
    parameters {
      id
      name
      display_name
      options {
        label
        value
      }
    }
  }
`;
