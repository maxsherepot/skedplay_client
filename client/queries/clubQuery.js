import gql from "graphql-tag";

export const ALL_CLUBS = gql`
  query allClubs($first: Int!, $page: Int!) {
    clubs(first: $first, page: $page) {
      data {
        id
        name
        address
        phones
        type {
          id
          name
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
