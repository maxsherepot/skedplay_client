import React, { useState } from "react";
import { useMutation, useApolloClient } from "@apollo/react-hooks";
import redirect from "lib/redirect";
import cookie from "cookie";

import {
  REGISTER_USER,
  SEND_VERTIFICATION_CODE,
  CHECK_VERTIFICATION_CODE
} from "queries";
import { getErrors } from "utils";
import { RegisterForm } from "components/register";
import { SendCodeStep, CheckCodeStep, RegisterStep } from "components/steps";
import ym from "react-yandex-metrika";
import Cookies from "js-cookie";

const RegisterBox = () => {
  const client = useApolloClient();

  const onCompleted = data => {
    // document.cookie = cookie.serialize("token", data.register.access_token, {
    //   maxAge: 30 * 24 * 60 * 60 // 30 days
    // });

    Cookies.set('token', data.register.access_token, { expires: 30 });

    if (process.env.ANALYTICS_SCRIPTS === 'true') {
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}

      gtag('event', 'registration', {'event_category' : 'click'});
      ym('reachGoal', 'registration');
    }

    client.clearStore().then(() => redirect({}, "/plans"));
  };

  const [phone, setPhone] = useState(null);

  const [sendCode] = useMutation(SEND_VERTIFICATION_CODE);
  const [checkCode] = useMutation(CHECK_VERTIFICATION_CODE);
  const [register] = useMutation(REGISTER_USER, {
    onCompleted
  });

  const onSubmitSendCode = async ({ phone, recaptcha }) => {
    try {
      const {
        data: {
          sendVerificationCode: { status, message }
        }
      } = await sendCode({
        variables: {
          phone,
          recaptcha
        }
      });

      setPhone(phone);

      return {
        status,
        message
      };
    } catch (e) {
      const errors = getErrors(e);

      return {
        status: false,
        message: "Server error",
        errors
      };
    }
  };

  const onSubmitCheckCode = async ({ phone, code }) => {
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

      return {
        status,
        message
      };
    } catch (e) {
      const errors = getErrors(e);

      return {
        status: false,
        message: "Server error",
        errors
      };
    }
  };

  return (
    <RegisterForm onSubmit={register}>
      <RegisterForm.Step
        validationSchema={SendCodeStep.validationSchema}
        onStepSubmit={onSubmitSendCode}
      >
        <SendCodeStep />
      </RegisterForm.Step>

      <RegisterForm.Step
        validationSchema={CheckCodeStep.validationSchema}
        onStepSubmit={onSubmitCheckCode}
      >
        <CheckCodeStep phone={phone} />
      </RegisterForm.Step>

      <RegisterForm.Step validationSchema={RegisterStep.validationSchema}>
        <RegisterStep />
      </RegisterForm.Step>
    </RegisterForm>
  );
};

export default RegisterBox;
