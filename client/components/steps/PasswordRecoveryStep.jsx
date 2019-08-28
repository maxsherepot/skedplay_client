import React from "react";
import * as Yup from "yup";

import { TextField } from "UI";

const PasswordRecoveryStep = () => {
  return (
    <>
      <TextField
        label="New password"
        type="password"
        name="password"
        placeholder="Enter new password"
      />

      <TextField
        label="Confirm new password"
        type="password"
        name="password_confirmation"
        placeholder="Enter new password confirmation"
      />
    </>
  );
};

PasswordRecoveryStep.validationSchema = Yup.object().shape({
  password: Yup.string().required(),
  password_confirmation: Yup.string().required()
});

export default PasswordRecoveryStep;
