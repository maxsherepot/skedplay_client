import gql from "graphql-tag";

export const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!, $recaptcha: String!) {
    login(
      input: { username: $username, password: $password, recaptcha: $recaptcha }
    ) {
      access_token
      user {
        id
        name
      }
    }
  }
`;
