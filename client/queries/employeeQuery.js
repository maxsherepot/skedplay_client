import gql from "graphql-tag";

export const ALL_EMPLOYEES = gql `
  query allEmployees($first: Int!, $page: Int!, $filters: EmployeeFilters) {
    employees(first: $first, page: $page, filters: $filters) {
      data {
        id
        name
        age
        type
        address
        current_address
        index
        isVip
        isNew
        inGeneral
        soon
        website
        email
        phone
        active
        status
        user_status
        will_activate_at
        city {
          id
          name
          canton {
            id
            name
          }
        }
        current_city {
          id
          name
          canton {
            id
            name
          }
        }
        lat
        lng
        current_lat
        current_lng
        favorited {
          id
        }
        avatar {
          id
          name
          url
          thumb_url
        }
        photos {
          url
          thumb_url
          custom_properties
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
  query getEmployee($id: ID!, $canton_id: Int, $city_id: Int) {
    employee(id: $id, canton_id: $canton_id, city_id: $city_id) {
      id
      first_name
      last_name
      name
      birthday
      age
      gender
      type
      service_for
      index
      email
      phone
      city_id
      city {
        id
        name
        canton {
            id
            name
        }
      }
      current_city {
        id
        name
        canton {
          id
          name
        }
      }
      address
      current_address
      type
      race_type_id
      description
      isVip
      isNew
      inGeneral
      website
      lat
      lng
      current_lat
      current_lng
      active
      will_activate_at
      favorited {
        id
      }
      owner {
       ... on User {
          id
          name
          phone
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
        photos {
          id
          url
          thumb_url
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
          at_address
          address
          club_id
          club {
            id
            name
            city {
              id
              name
              canton {
                id
                name
              }
            }
          }
      }
      languages {
        id
        name
        code
        pivot {
          stars
        }
      }
      parameters {
        id
        parameter {
            id
            name
        }
        parameter_option {
            id
            value
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
      avatar {
          id
          name
          url
          thumb_url
      }
      photos {
        id
        url
        thumb_url
        custom_properties
        model_type
        model_id
        collection_name
      }
      videos {
        id
        url
        thumb_url
        mime_type
        custom_properties
      }
      unread_messages_count
      user_unread_messages_count
      current_club {
        id
        name
        city {
          id
          name
          canton {
            id
            name
          }
        }
        address
        lat
        lng
        logo {
          id
          url
          thumb_url
        }
        type {
          id
          name
        }
      }
    }
  }
`;

export const UPDATE_USER = gql `
  mutation updateUser($user: ID!, $input: UserInput) {
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
  mutation updateEmployee($employee: ID!, $input: EmployeeInput) {
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
      at_address
      address
      club {
        id
        name
        phones
        city {
          id
          name
          canton {
            id
            name
          }
        }
      }
    }
  }
`;

export const GET_RACE_TYPES = gql`
  query employeeRaceTypes {
    employee_race_types {
      id
      name
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