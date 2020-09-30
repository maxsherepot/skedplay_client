import gql from "graphql-tag";

export const SETTINGS = gql `
    query settings {
        settings {
            id
            key
            label
            value
        }
    }
`;