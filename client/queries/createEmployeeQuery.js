import gql from "graphql-tag";

export const CREATE_EMPLOYEE_AD = gql `
  mutation createEmployee($input: EmployeeInput!) {
    createEmployee(input: $input) {
      id
    }
  }
`;

export const SYNC_EMPLOYEE_PRICES = gql `
  mutation syncEmployeePrices($employee: ID!, $prices: JSON) {
    syncEmployeePrices(employee: $employee, prices: $prices) {
      status
      message
    }
  }
`;

export const SYNC_EMPLOYEE_SERVICES = gql `
  mutation syncEmployeeServices($employee: ID!, $services: JSON) {
    syncEmployeeServices(employee: $employee, services: $services) {
      status
      message
    }
  }
`;

export const UPLOAD_EMPLOYEE_FILES = gql `
  mutation uploadEmployeeFiles(
    $employee: ID!
    $collection: String!
    $files: [Upload!]
    $custom_properties: JSON
  ) {
    uploadEmployeeFiles(
      employee: $employee
      collection: $collection
      files: $files
      custom_properties: $custom_properties
    ) {
      status
      message
    }
  }
`;

export const CREATE_EMPLOYEE_EVENT = gql `
  mutation createEmployeeEvent(
    $input: EventInput
  ) {
      createEmployeeEvent(
      input: $input
    ) {
      id
      title
    }
  }
`;

export const CREATE_EMPLOYEE_SCHEDULE = gql `
  mutation createEmployeeSchedule(
    $input: EmployeeSchedulesInput
  ) {
    createEmployeeSchedule(
      input: $input
    ) {
      status
      message
    }
  }
`;

export const UPDATE_EMPLOYEE_SCHEDULE = gql `
  mutation updateEmployeeSchedule(
    $input: EmployeeSchedulesInput
  ) {
    updateEmployeeSchedule(
      input: $input
    ) {
      status
      message
    }
  }
`;

export const UPDATE_EMPLOYEE_CURRENT_POSITION = gql `
    mutation updateEmployeeCurrentPosition(
        $employee: ID!
        $input: EmployeeCurrentPositionInput
    ) {
        updateEmployeeCurrentPosition(
            input: $input,
            employee: $employee
        ) {
            status
            message
        }
    }
`;