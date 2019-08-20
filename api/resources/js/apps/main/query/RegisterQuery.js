import gql from 'graphql-tag';

export const REGISTER_USER = gql`
  mutation register(
    $account_type: String!
    $first_name: String!
    $phone: String!
    $email: String!
    $password: String!
    $password_confirmation: String!
    $recaptcha: String!
  ) {
    register(
      input: {
        account_type: $account_type
        first_name: $first_name
        phone: $phone
        email: $email
        password: $password
        password_confirmation: $password_confirmation
        recaptcha: $recaptcha
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
