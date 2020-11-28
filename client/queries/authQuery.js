import gql from "graphql-tag";

export const LOGIN_USER = gql`
  mutation login(
    $username: String!
    $password: String!
    $recaptcha: String # $remember_me: Boolean
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
    $birthday: String!
    $first_name: String!

    $last_name: String!
    
    $phone: String!
    $email: String!
    $password: String!
    $password_confirmation: String!
    $recaptcha: String
    $ref_code: String
  ) {
    register(
      input: {
        account_type: $account_type
        birthday: $birthday
        first_name: $first_name

        last_name: $last_name

        phone: $phone
        email: $email
        password: $password
        password_confirmation: $password_confirmation
        recaptcha: $recaptcha
        ref_code: $ref_code
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
  mutation sendVerificationCode($phone: String!, $recaptcha: String) {
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

export const FORGOT_PASSWORD = gql`
  mutation forgotPassword($phone: String!, $recaptcha: String) {
    forgotPassword(input: { phone: $phone, recaptcha: $recaptcha }) {
      expires_at
      status
      message
    }
  }
`;

export const RESET_PASSWORD = gql`
  mutation resetPassword(
    $code: String!
    $phone: String!
    $password: String!
    $password_confirmation: String!
  ) {
    resetPassword(
      input: {
        code: $code
        phone: $phone
        password: $password
        password_confirmation: $password_confirmation
      }
    ) {
      status
      message
    }
  }
`;
