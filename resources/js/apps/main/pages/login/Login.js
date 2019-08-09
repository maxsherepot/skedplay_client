import React, { Fragment } from 'react';
import gql from 'graphql-tag';
import { useApolloClient, useMutation } from '@apollo/react-hooks';
import LoginForm from '@/pages/login/LoginForm';
import Error from '@/components/Error';

const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!, $recaptcha: String!) {
    login(input: { username: $username, password: $password, recaptcha: $recaptcha }) {
      access_token
      user {
        id
        name
      }
    }
  }
`;

export default function Login() {
  const client = useApolloClient();

  const [login, { loading, error }] = useMutation(LOGIN_USER, {
    onCompleted({ login: { access_token } }) {
      localStorage.setItem('token', access_token);
      client.writeData({ data: { isLoggedIn: true } });
    },
  });

  if (loading) return <p>Loading...</p>;

  return (
    <Fragment>
      <Error error={error} />
      <LoginForm onLogin={login} />
    </Fragment>
  );
}
