import gql from "graphql-tag";

export const GET_CURRENT_REGISTER_STEP = gql`
  query {
    currentRegisterStep @client
  }
`;
