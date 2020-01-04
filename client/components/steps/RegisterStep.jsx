import React from "react";
import * as Yup from "yup";

import { TextField, ButtonGroupField, DateRawField } from "UI";

const RegisterStep = () => {
  return (
    <>
      <ButtonGroupField
        className="mt-4"
        label="What account type you need"
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

      <div className="md:flex md:justify-between md:-mx-3">
        <ButtonGroupField
          className="md:w-5/12 md:px-3"
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

        <DateRawField
          className="md:w-7/12 md:px-3"
          label="Date of birth"
          name="birthday"
        />
      </div>

      <div className="sm:flex sm:justify-between sm:-mx-3">
        <TextField
          className="sm:flex-1 sm:px-3"
          label="First name (required)"
          name="first_name"
        />

        <TextField
          className="sm:flex-1 sm:px-3"
          label="Last name"
          name="last_name"
        />
      </div>

      <TextField label="Mail" name="email" placeholder="Enter your email" />

      <div className="sm:flex sm:justify-between sm:-mx-3">
        <TextField
          className="sm:flex-1 sm:px-3"
          label="Password"
          type="password"
          name="password"
          placeholder="Enter password"
        />

        <TextField
          className="sm:flex-1 sm:px-3"
          label="Confirm password"
          type="password"
          name="password_confirmation"
          placeholder="Enter password confirmation"
        />
      </div>
    </>
  );
};

RegisterStep.validationSchema = Yup.object().shape({
  account_type: Yup.string().required(),
  birthday: Yup.string().required(),
  first_name: Yup.string().required(),
  gender: Yup.number().required(),
  email: Yup.string().required(),
  password: Yup.string().required(),
  password_confirmation: Yup.string().required()
});

export default RegisterStep;
