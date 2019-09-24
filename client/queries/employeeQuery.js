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
        favorited {
          id
        }
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
      favorited {
        id
      }
      events {
        id
        title
        short_title
        favorited {
          id
        }
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

export const UPDATE_USER = gql`
  mutation updateUser($user: ID!, $input: UserInput!) {
    updateUser(user: $user, input: $input) {
      status
      message
    }
  }
`;
