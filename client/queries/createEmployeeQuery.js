import gql from "graphql-tag";

export const CREATE_EMPLOYEE_AD = gql`
  mutation createEmployee($input: EmployeeCreateInput!) {
    createEmployee(input: $input) {
      status
      message
      employee {
        id
      }
    }
  }
`;
