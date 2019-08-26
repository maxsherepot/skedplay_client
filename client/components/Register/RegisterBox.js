import { useState } from "react";
import { useMutation, useApolloClient } from "@apollo/react-hooks";
import cookie from "cookie";
import redirect from "lib/redirect";
import { Field } from "formik";
import * as Yup from "yup";

import {
  REGISTER_USER,
  SEND_VERTIFICATION_CODE,
  CHECK_VERTIFICATION_CODE
} from "queries";
import { TextField, FormGroup, ButtonsField } from "components/Ui";
import Captcha from "components/Captcha";
import { RegisterForm } from "components/Register";

const step1ValidationSchema = Yup.object().shape({
  phone: Yup.string().required(),
  recaptcha: Yup.string().required()
});

const step2ValidationSchema = Yup.object().shape({
  code: Yup.string().required()
});

const step3ValidationSchema = Yup.object().shape({
  account_type: Yup.string().required(),
  first_name: Yup.string().required(),
  email: Yup.string().required(),
  password: Yup.string().required(),
  password_confirmation: Yup.string().required()
});

const TimeLeft = expires_at => {
  console.log(expires_at);

  return <p>Time left: 1:52</p>;
};

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

  const [phone, setPhone] = useState(null);
  const [status, setStatus] = useState(null);
  const [expires, setExpires] = useState(0);

  const [sendCode] = useMutation(SEND_VERTIFICATION_CODE);
  const [checkCode] = useMutation(CHECK_VERTIFICATION_CODE);
  const [register] = useMutation(REGISTER_USER, {
    onCompleted
  });

  const onStep1Submit = async ({ phone, recaptcha }) => {
    try {
      const {
        data: {
          sendVerificationCode: { expires_at }
        }
      } = await sendCode({
        variables: {
          phone,
          recaptcha
        }
      });

      setPhone(phone);
      setExpires(expires_at);

      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  };

  const onStep2Submit = async ({ phone, code }) => {
    try {
      const {
        data: {
          checkVerificationCode: { status, message }
        }
      } = await checkCode({
        variables: {
          phone,
          code
        }
      });

      if (!status) {
        throw message;
      }

      return true;
    } catch (e) {
      setStatus(e);
      return false;
    }
  };

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

      <RegisterForm.Step
        validationSchema={step2ValidationSchema}
        onStepSubmit={onStep2Submit}
      >
        <div className="block text-xs text-center leading-normal my-4 px-6">
          A verification code has been sent your phone number
        </div>

        <div className="block text-lg text-center font-medium">{phone}</div>

        <TextField
          className="mt-4"
          label="Confirmation code"
          name="code"
          placeholder="Enter code"
        />

        {status && (
          <FormGroup className="error text-center">
            <span>{status}</span>
          </FormGroup>
        )}
      </RegisterForm.Step>

      <RegisterForm.Step validationSchema={step3ValidationSchema}>
        <ButtonsField
          className="mt-4"
          label="What account type you need?"
          name="account_type"
          options={[
            {
              name: "I provide sex services",
              value: "employee"
            },
            {
              name: "I own a club",
              value: "club_owner"
            },
            {
              name: "I'm looking for sex",
              value: "client"
            }
          ]}
        />

        <TextField
          label="Your name"
          name="first_name"
          placeholder="Enter your name"
        />

        <TextField
          label="Your email"
          name="email"
          placeholder="Enter your email"
        />

        <TextField
          label="Your password"
          type="password"
          name="password"
          placeholder="Enter your password"
        />

        <TextField
          label="Your password confirmation"
          type="password"
          name="password_confirmation"
          placeholder="Enter your password confirmation"
        />
      </RegisterForm.Step>
    </RegisterForm>
  );
};

export default RegisterBox;
