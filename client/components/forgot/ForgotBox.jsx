import { useState } from "react";
import { useMutation } from "@apollo/react-hooks";

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
} from "components/register";

import { ForgotForm } from "components/forgot";

const ForgotBox = () => {
  const [phone, setPhone] = useState(null);
  const [status, setStatus] = useState(null);

  const [sendCode] = useMutation(SEND_VERTIFICATION_CODE);
  const [checkCode] = useMutation(CHECK_VERTIFICATION_CODE);
  const [register] = useMutation(REGISTER_USER);

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
    <ForgotForm onSubmit={register}>
      <ForgotForm.Step
        validationSchema={SendCodeStep.validationSchema}
        onStepSubmit={onSubmitSendCode}
      >
        <SendCodeStep />
      </ForgotForm.Step>

      <ForgotForm.Step
        validationSchema={CheckCodeStep.validationSchema}
        onStepSubmit={onSubmitCkeckCode}
      >
        <CheckCodeStep phone={phone} status={status} />
      </ForgotForm.Step>

      <ForgotForm.Step validationSchema={RegisterStep.validationSchema}>
        <RegisterStep />
      </ForgotForm.Step>
    </ForgotForm>
  );
};

export default ForgotBox;
