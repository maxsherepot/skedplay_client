import gql from "graphql-tag";

export const GET_EMPLOYEE_COMPLAINT_THEMES = gql`
    query employeeComplaintThemes {
        employeeComplaintThemes {
            id
            name
        }
    }
`;

export const CREATE_EMPLOYEE_COMPLAINT = gql`
    mutation createEmployeeComplaint($input: EmployeeComplaintInput) {
        createEmployeeComplaint(input: $input) {
            id
        }
    }
`;
