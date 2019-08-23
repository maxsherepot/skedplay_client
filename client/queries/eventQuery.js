import gql from "graphql-tag";

export const ALL_EVENTS = gql`
    query allEvents(
        $count: Int!
    ) {
        events(count: $count) {
            id
            title
        }
    }
`;