import React from "react";
import { useMutation, useApolloClient } from "@apollo/react-hooks";
import cookie from "cookie";

import redirect from "lib/redirect";
import { LOGIN_USER } from "queries";
import { LoginForm } from "components/login";
import Cookies from 'js-cookie';

const LoginBox = () => {
  const client = useApolloClient();

  const onCompleted = ({ login: { access_token, user } }) => {
    Cookies.set('token', access_token, {expires: 30});
    client.cache.reset().then(() => {
      client.writeData({
        data: {
          me: user
        }
      });
      redirect({}, "/");
    });
  };

  const [onLogin] = useMutation(LOGIN_USER, {
    onCompleted
  });

  return <LoginForm onSubmit={onLogin} />;
};

export default LoginBox;
