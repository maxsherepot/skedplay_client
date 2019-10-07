import gql from "graphql-tag";

export const GET_PRICE_TYPES = gql`
  query price_types {
    price_types {
      id
      name
      display_name
    }
  }
`;