import gql from "graphql-tag";

export const LOGIN_USER = gql`
  mutation login(
    $username: String!
    $password: String!
    $recaptcha: String!
    $remember_me: Boolean
  ) {
    login(
      input: {
        username: $username
        password: $password
        recaptcha: $recaptcha
        remember_me: $remember_me
      }
    ) {
      access_token
      user {
        id
        name
      }
    }
  }
`;
