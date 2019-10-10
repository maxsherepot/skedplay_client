import gql from "graphql-tag";

export const CREATE_EMPLOYEE_AD = gql`
  mutation createEmployee($input: EmployeeCreateInput!) {
    createEmployee(input: $input) {
      id
    }
  }
`;

export const SYNC_EMPLOYEE_PRICES = gql`
  mutation syncEmployeePrices($employee: ID!, $prices: JSON) {
    syncEmployeePrices(employee: $employee, prices: $prices) {
      status
      message
    }
  }
`;

export const SYNC_EMPLOYEE_SERVICES = gql`
  mutation syncEmployeeServices($employee: ID!, $services: JSON) {
    syncEmployeeServices(employee: $employee, services: $services) {
      status
      message
    }
  }
`;

export const UPLOAD_EMPLOYEE_FILES = gql`
  mutation uploadEmployeeFiles(
    $employee: ID!
    $collection: String!
    $files: [Upload!]
  ) {
    uploadEmployeeFiles(
      employee: $employee
      collection: $collection
      files: $files
    ) {
      status
      message
    }
  }
`;
