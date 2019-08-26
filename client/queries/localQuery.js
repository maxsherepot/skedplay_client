import gql from "graphql-tag";

export const GET_CURRENT_REGISTER_STEP = gql`
  query apolloState {
    apolloState @client {
      currentRegisterStep @client
    }
  }
`;
