import gql from "graphql-tag";

export const CREATE_REVIEW = gql`
  mutation createReview($employee: ID!, $input: ReviewInput) {
    createReview(employee: $employee, input: $input) {
      id
      title
      body
      reviewable {
        ... on Club {
          id
          name
          __typename
        }
        ... on Employee {
          id
          first_name
          last_name
          __typename
        }
      }
      user {
        id
        name
      }
      replies {
        body
        user {
          id
          name
        }
        created_at
      }
      created_at
    }
  }
`;
