import gql from "graphql-tag";

export const ALL_EVENTS = gql`
  query allEvents($first: Int!, $page: Int!) {
    events(first: $first, page: $page) {
      data {
        id
        title
        club {
          address
        }
        photos {
          url
        }
      }
      paginatorInfo {
        count
        currentPage
        firstItem
        hasMorePages
        lastItem
        lastPage
        perPage
        total
      }
    }
  }
`;

export const GET_EVENT = gql`
  query getEvent($id: ID!) {
    event(id: $id) {
      id
      title
      description
      club {
        address
      }
      photos {
        url
      }
    }
  }
`;
