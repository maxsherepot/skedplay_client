import React from 'react';
import gql from 'graphql-tag';
import { useApolloClient, useMutation } from '@apollo/react-hooks';
import LoginForm from './LoginForm';

const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(input: { username: $username, password: $password }) {
      access_token
      user {
        id
        first_name
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
  if (error) return <p>An error occurred</p>;

  return <LoginForm onLogin={login} />;
}
