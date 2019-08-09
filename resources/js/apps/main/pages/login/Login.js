import React, { Fragment } from 'react';
import { useApolloClient, useMutation } from '@apollo/react-hooks';
import LoginForm from '@/pages/login/LoginForm';
import Error from '@/components/Error';
import { LOGIN_USER } from '@/query/LoginQuery';

export default function Login() {
  const client = useApolloClient();

  const [login, { error }] = useMutation(LOGIN_USER, {
    onCompleted({ login: { access_token } }) {
      localStorage.setItem('token', access_token);
      client.writeData({ data: { isLoggedIn: true } });
    },
  });

  return (
    <Fragment>
      <Error error={error} />
      <LoginForm onSubmit={login} />
    </Fragment>
  );
}
