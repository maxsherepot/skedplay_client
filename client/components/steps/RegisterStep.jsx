import React from "react";
import * as Yup from "yup";

import { TextField, ButtonGroupField } from "UI";

const RegisterStep = () => {
  return (
    <>
      <ButtonGroupField
        className="mt-4"
        label="What account type you need?"
        name="account_type"
        items={[
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

      <ButtonGroupField
        className="mt-4"
        label="Gender"
        name="gender"
        items={[
          {
            name: "Male",
            value: 2
          },
          {
            name: "Female",
            value: 1
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
    </>
  );
};

RegisterStep.validationSchema = Yup.object().shape({
  account_type: Yup.string().required(),
  first_name: Yup.string().required(),
  gender: Yup.number().required(),
  email: Yup.string().required(),
  password: Yup.string().required(),
  password_confirmation: Yup.string().required()
});

export default RegisterStep;
