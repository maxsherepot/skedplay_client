import gql from "graphql-tag";

export const GET_EMPLOYEE_PARAMETERS = gql`
  query options {
    parameters {
      id
      name
      options {
        id
        value
      }
    }
  }
`;
