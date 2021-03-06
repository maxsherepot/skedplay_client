import { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import Router from "next/router";
import {useTranslation} from "react-i18next";

import { FORGOT_PASSWORD, RESET_PASSWORD } from "queries";
import { getErrors } from "utils";
import { ForgotForm } from "components/forgot";
import {
  SendCodeStep,
  CheckCodeStep,
  PasswordRecoveryStep
} from "components/steps";

const ForgotBox = () => {
  const [phone, setPhone] = useState(null);
  const {t, i18n} = useTranslation();
  const [forgotPassword] = useMutation(FORGOT_PASSWORD);
  const [resetPassword] = useMutation(RESET_PASSWORD);

  const onSubmitForgotPassword = async ({ phone, recaptcha }) => {
    try {
      const {
        data: {
          forgotPassword: { status, message }
        }
      } = await forgotPassword({
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

  const onSubmitCkeckCode = async () => {
    return {
      status: true
    };
  };

  const onSubmitReset = async ({
    phone,
    code,
    password,
    password_confirmation
  }) => {
    try {
      const {
        data: {
          resetPassword: { status, message }
        }
      } = await resetPassword({
        variables: {
          phone,
          code,
          password,
          password_confirmation
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

  const handleSuccess = () => {
    return Router.push("/login");
  };

  return (
    <ForgotForm onSubmit={handleSuccess}>
      <ForgotForm.Step
        validationSchema={SendCodeStep.validationSchema}
        onStepSubmit={onSubmitForgotPassword}
      >
        <SendCodeStep />
      </ForgotForm.Step>

      <ForgotForm.Step
        validationSchema={CheckCodeStep.validationSchema}
        onStepSubmit={onSubmitCkeckCode}
      >
        <CheckCodeStep phone={phone} />
      </ForgotForm.Step>

      <ForgotForm.Step
        validationSchema={PasswordRecoveryStep.validationSchema}
        onStepSubmit={onSubmitReset}
      >
        <PasswordRecoveryStep />
      </ForgotForm.Step>

      <ForgotForm.Step>
        <h1 className="text-2xl text-center mt-4">
          {t('forgot.password_recovery_successfully')}
        </h1>
        <div className="text-center my-4">
          <p>
            {t('forgot.msg_password_recovery')}
          </p>
        </div>
      </ForgotForm.Step>
    </ForgotForm>
  );
};

export default ForgotBox;
