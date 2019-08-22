import { useMutation, useApolloClient } from "@apollo/react-hooks";
import cookie from "cookie";
import redirect from "lib/redirect";
import { Field } from "formik";

import { REGISTER_USER } from "queries";
import { TextField } from "components/forms";
import Captcha from "components/Captcha";
import { RegisterForm } from "components/forms/registration";

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

  return (
    <RegisterForm onSubmit={register}>
      <RegisterForm.Step>
        <TextField className="mt-4" label="Phone number" name="phone" />

        <div className="flex justify-center my-4">
          <Field name="recaptcha" as={Captcha} />
        </div>

        <div className="block text-xs text-center leading-normal mb-8 px-6">
          By clicking the “sing up” button, I agree to the terms of service and
          personal data processing policy
        </div>
      </RegisterForm.Step>

      <RegisterForm.Step>
        <TextField className="mt-4" label="Code verify" name="verify" />
      </RegisterForm.Step>
    </RegisterForm>
  );
};

export default RegisterBox;
