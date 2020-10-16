import gql from "graphql-tag";

export const CREATE_CONTACT_REQUEST = gql`
    mutation createContactRequest($input: ContactRequestInput) {
        createContactRequest(input: $input) {
            id
        }
    }
`;
