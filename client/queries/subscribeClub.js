import gql from "graphql-tag";


export const CREATE_SUBSCRIBE_CLUB = gql`
    mutation createSubscribeClub(
        $email: String!
        $club_id: Int!
    ) {
        createSubscribeClub(
            email: $email
            club_id: $club_id
        ) {
            status
            message
        }
    }
`;
