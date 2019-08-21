import { useMutation, useApolloClient } from "@apollo/react-hooks";
import cookie from "cookie";
import redirect from "lib/redirect";

import { REGISTER_USER } from "queries";
import { RegisterForm } from "components/forms";

const RegisterBox = () => {
  const client = useApolloClient();

  const onCompleted = data => {
    document.cookie = cookie.serialize("token", data.register.access_token, {
      maxAge: 30 * 24 * 60 * 60 // 30 days
    });
    client.cache.reset().then(() => {
      redirect({}, "/");
    });
  };

  const [register] = useMutation(REGISTER_USER, {
    onCompleted
  });

  return <RegisterForm onSubmit={register} />;
};

export default RegisterBox;
