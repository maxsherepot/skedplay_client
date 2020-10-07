import gql from "graphql-tag";


export const CREATE_SUBSCRIBE_EMPLOYEE = gql`
    mutation createSubscribeEmployee(
        $email: String!
        $employee_id: Int!
        $locale: String!
    ) {
        createSubscribeEmployee(
            email: $email
            employee_id: $employee_id
            locale: $locale
        ) {
            status
            message
        }
    }
`;
