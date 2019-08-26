import { useState } from "react";
import { useMutation, useApolloClient } from "@apollo/react-hooks";
import redirect from "lib/redirect";
import cookie from "cookie";

import {
  REGISTER_USER,
  SEND_VERTIFICATION_CODE,
  CHECK_VERTIFICATION_CODE
} from "queries";
import {
  RegisterForm,
  SendCodeStep,
  CheckCodeStep,
  RegisterStep
} from "components/Register";

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
  // const [expires, setExpires] = useState(0);

  const [sendCode] = useMutation(SEND_VERTIFICATION_CODE);
  const [checkCode] = useMutation(CHECK_VERTIFICATION_CODE);
  const [register] = useMutation(REGISTER_USER, {
    onCompleted
  });

  const onSubmitSendCode = async ({ phone, recaptcha }) => {
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
      // setExpires(expires_at);

      return true;
    } catch (e) {
      return false;
    }
  };

  const onSubmitCkeckCode = async ({ phone, code }) => {
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
        validationSchema={SendCodeStep.validationSchema}
        onStepSubmit={onSubmitSendCode}
      >
        <SendCodeStep />
      </RegisterForm.Step>

      <RegisterForm.Step
        validationSchema={CheckCodeStep.validationSchema}
        onStepSubmit={onSubmitCkeckCode}
      >
        <CheckCodeStep phone={phone} status={status} />
      </RegisterForm.Step>

      <RegisterForm.Step validationSchema={RegisterStep.validationSchema}>
        <RegisterStep />
      </RegisterForm.Step>
    </RegisterForm>
  );
};

export default RegisterBox;
