import gql from "graphql-tag";

export const CANTONS = gql `
  query cantons {
      cantons {
      id
      name
    }
  }
`;

export const CANTONS_AND_CITIES = gql `
    query cantonsAndCities {
        cantons {
            id
            name
        }
        cities {
            id
            name
            canton_id
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