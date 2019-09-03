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
