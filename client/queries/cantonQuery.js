import gql from "graphql-tag";

export const CANTONS = gql `
  query cantons {
      cantons {
      id
      name
    }
  }
`;

export const CANTONS_WITH_CITIES_IDS = gql `
  query cantons {
      cantons {
      id
      name
      cities {
          id
      }
    }
  }
`;