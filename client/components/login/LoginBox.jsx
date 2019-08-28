import React from "react";
import { useMutation, useApolloClient } from "@apollo/react-hooks";
import cookie from "cookie";

import redirect from "lib/redirect";
import { LOGIN_USER } from "queries";
import { LoginForm } from "components/login";

const LoginBox = () => {
  const client = useApolloClient();

  const onCompleted = ({ login: { access_token } }) => {
    document.cookie = cookie.serialize("token", access_token, {
      maxAge: 30 * 24 * 60 * 60 // 30 days
    });
    client.cache.reset().then(() => {
      redirect({}, "/");
    });
  };

  const [onLogin] = useMutation(LOGIN_USER, {
    onCompleted
  });

  return <LoginForm onSubmit={onLogin} />;
};

export default LoginBox;