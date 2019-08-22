import { useMutation, useApolloClient } from "@apollo/react-hooks";
import cookie from "cookie";
import redirect from "lib/redirect";
import { Field } from "formik";
import * as Yup from "yup";

import { REGISTER_USER, SEND_VERTIFICATION_CODE } from "queries";
import { TextField } from "components/forms";
import Captcha from "components/Captcha";
import { RegisterForm } from "components/Register";

const step1ValidationSchema = Yup.object().shape({
  phone: Yup.string().required(),
  recaptcha: Yup.string().required()
});
const step2ValidationSchema = Yup.object().shape({
  confirmation_code: Yup.string().required()
});

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

  const [sendCode] = useMutation(SEND_VERTIFICATION_CODE, {
    onCompleted
  });

  const onStep1Submit = values => {
    console.log(values);
  };

  // Yup.object().shape({
  //   account_type: Yup.string().required(),
  //   first_name: Yup.string().required(),
  //   email: Yup.string().required(),
  //   gender: Yup.number().required(),
  //   birthday: Yup.string().required(),
  //   password: Yup.string().required(),
  //   password_confirmation: Yup.string().required()
  // });

  return (
    <RegisterForm onSubmit={register}>
      <RegisterForm.Step
        validationSchema={step1ValidationSchema}
        onStepSubmit={onStep1Submit}
      >
        <TextField
          className="mt-4"
          label="Phone number"
          name="phone"
          placeholder="+417"
        />

        <div className="flex justify-center my-4">
          <Field name="recaptcha" as={Captcha} />
        </div>

        <div className="block text-xs text-center leading-normal mb-8 px-6">
          By clicking the “sing up” button, I agree to the terms of service and
          personal data processing policy
        </div>
      </RegisterForm.Step>

      <RegisterForm.Step validationSchema={step2ValidationSchema}>
        <TextField
          className="mt-4"
          label="Confirmation code"
          name="confirmation_code"
          placeholder="Enter code"
        />
      </RegisterForm.Step>
    </RegisterForm>
  );
};

export default RegisterBox;
