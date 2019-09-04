import gql from "graphql-tag";

export const ALL_EMPLOYEES = gql`
  query allEmployees($first: Int!, $page: Int!) {
    employees(first: $first, page: $page) {
      data {
        id
        first_name
        last_name
        name
        age
        address
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
