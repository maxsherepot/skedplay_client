import gql from "graphql-tag";

export const CITIES = gql `
  query cities {
    cities {
      id
      name
      slug
    }
  }
`;