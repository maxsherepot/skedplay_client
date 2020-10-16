import gql from "graphql-tag";

export const SCHEDULE_WEEK_PERIOD = gql`
    query {
        schedule_period {
            day
            display_name
            today
            date
        }
    }
`;


