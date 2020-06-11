import gql from "graphql-tag";

export const EMPLOYEES_SEO = gql `
    query employeesSeo($input: EmployeeSeoInput) {
        employeesSeo(input: $input) {
            h1
            title
            description
            keywords
        }
    }
`;

export const CLUBS_SEO = gql `
    query clubsSeo($input: ClubSeoInput) {
        clubsSeo(input: $input) {
            h1
            title
            description
            keywords
        }
    }
`;

export const EVENTS_SEO = gql `
    query eventsSeo($input: EventSeoInput) {
        eventsSeo(input: $input) {
            h1
            title
            description
            keywords
        }
    }
`;