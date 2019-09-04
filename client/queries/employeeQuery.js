import gql from "graphql-tag";

export const ALL_EMPLOYEES = gql`
  query allEmployees($first: Int!, $page: Int!) {
    employees(first: $first, page: $page) {
      data {
        id
        name
        age
        address
        isVip
        isNew
        photos {
          url
          thumb_url
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
