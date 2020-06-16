import gql from "graphql-tag";

export const CANTONS = gql `
  query cantons {
      cantons {
      id
      name
      slug
    }
  }
`;

export const CANTONS_AND_CITIES = gql `
    query cantonsAndCities {
        cantons {
            id
            name
            slug
        }
        cities {
            id
            name
            slug
            canton_id
        }
    }
`;

export const CANTONS_WITH_CITIES_IDS = gql `
  query cantons {
      cantons {
      id
      name
      slug
      cities {
        id
      }
    }
  }
`;