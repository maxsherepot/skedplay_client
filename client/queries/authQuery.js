import gql from "graphql-tag";

export const LOGIN_USER = gql`
  mutation login(
    $username: String!
    $password: String!
    $recaptcha: String! # $remember_me: Boolean
  ) {
    login(
      input: {
        username: $username
        password: $password
        recaptcha: $recaptcha
        # remember_me: $remember_me
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

export const SEND_VERTIFICATION_CODE = gql`
  mutation sendVerificationCode($phone: String!, $recaptcha: String!) {
    sendVerificationCode(input: { phone: $phone, recaptcha: $recaptcha }) {
      expires_at
      status
      message
    }
  }
`;

export const CHECK_VERTIFICATION_CODE = gql`
  mutation checkVerificationCode($phone: String!, $code: String!) {
    checkVerificationCode(input: { phone: $phone, code: $code }) {
      status
      message
    }
  }
`;
