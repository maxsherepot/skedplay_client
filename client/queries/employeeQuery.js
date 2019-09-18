import gql from "graphql-tag";

export const ALL_EMPLOYEES = gql`
  query allEmployees($first: Int!, $page: Int!, $filters: EmployeeFilters) {
    employees(first: $first, page: $page, filters: $filters) {
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

export const GET_EMPLOYEE = gql`
  query getEmployee($id: ID!) {
    employee(id: $id) {
      id
      first_name
      last_name
      name
      age
      address
      type
      race_type_id
      description
      isVip
      isNew
      events {
        id
        title
        short_title
        type {
          id
          name
        }
      }
      services {
        id
        name
        pivot {
          price
        }
      }
      prices {
        id
        name
        pivot {
          price
        }
      }
      photos {
        url
        thumb_url
      }
    }
  }
`;
