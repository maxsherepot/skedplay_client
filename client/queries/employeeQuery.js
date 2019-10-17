import gql from "graphql-tag";

export const ALL_EMPLOYEES = gql `
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

export const GET_EMPLOYEE = gql `
  query getEmployee($id: ID!) {
    employee(id: $id) {
      id
      first_name
      last_name
      name
      age
      gender
      address
      type
      race_type_id
      description
      isVip
      isNew
      favorited {
        id
      }
      owner {
       ... on User {
          id
          name
        }
      ... on Club {
          id
          name
        }
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
      schedule {
          id
          day
          day_name
          start
          end
          order
          available
      }
      parameters {
        id
        name
        display_name
        pivot {
          value
          display_value
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
        display_name
        pivot {
          price
        }
      }
      reviews {
        id
      }
      photos {
        id
        url
        thumb_url
      }
      videos {
        id
        url
        thumb_url
      }
    }
  }
`;

export const UPDATE_USER = gql `
  mutation updateUser($user: ID!, $input: UserInput!) {
    updateUser(user: $user, input: $input) {
      status
      message
    }
  }
`;

export const DELETE_EMPLOYEE = gql `
  mutation deleteEmployee($employee: ID!) {
    deleteEmployee(employee: $employee) {
      status
      message
    }
  }
`;

export const UPDATE_EMPLOYEE = gql `
  mutation updateEmployee($employee: ID!, $input: EmployeeInput!) {
    updateEmployee(employee: $employee, input: $input) {
      status
      message
    }
  }
`;

export const GET_EMPLOYEE_SCHEDULE = gql `
  query employee_schedule($employee_id: ID!) {
    schedule_period {
      day
      date
    }
    employee_schedule(employee_id: $employee_id) {
      id
      day
      day_name
      start
      end
      available
      club {
        id
        name
        phones
      }
    }
  }
`;

export const ALL_REVIEWS = gql `
  query reviews($first: Int!, $page: Int, $reviewable_id: ID!) {
    reviews(first: $first, page: $page, reviewable_id: $reviewable_id) {
      data {
        id
        title
        body
        reviewable {
          ... on Club {
            id
            name
            __typename
          }
          ... on Employee {
            id
            first_name
            last_name
            __typename
          }
        }
        user {
          id
          name
        }
        replies {
          body
          user {
            id
            name
          }
          created_at
        }
        created_at
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