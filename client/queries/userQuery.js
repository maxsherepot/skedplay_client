import gql from "graphql-tag";

export const FAVORITE_EMPLOYEES = gql`
  query getFavoriteEmployees($id: ID!) {
    favoriteEmployees(id: $id) {
      id
      name
      age
      address
      isVip
      isNew
      favorited {
        id
      }
      photos {
        url
        thumb_url
      }
    }
  }
`;

export const FAVORITE_CLUBS = gql`
  query getFavoriteClubs($id: ID!) {
    favoriteClubs(id: $id) {
      id
      name
      address
      phones
      favorited {
        id
      }
      type {
        id
        name
      }
      photos {
        url
      }
    }
  }
`;

export const FAVORITE_EVENTS = gql`
  query getFavoriteEvents($id: ID!) {
    favoriteEvents(id: $id) {
      id
      title
      favorited {
        id
      }
      club {
        address
        services {
          id
          name
          pivot {
            price
          }
        }
      }
      type {
        id
        name
      }
      photos {
        url
      }
    }
  }
`;
