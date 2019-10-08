import React, { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import PropTypes from "prop-types";

import {
  Button,
  Checkbox,
  FormGroup,
  TextField,
  SelectField,
  TextAreaField,
  FileField
} from "UI";
import { getErrors } from "utils";

function NewClubForm({ onSubmit }) {
  const [error, setError] = useState(null);

  const handleSubmits = async (values, { setSubmitting, setErrors }) => {
    try {
      await onSubmit({
        variables: {
          input: values
        }
      });
    } catch (e) {
      if (getErrors(e) instanceof Object) {
        setErrors(getErrors(e));
      } else {
        setError(getErrors(e));
      }
    }
    setSubmitting(false);
  };

  return (
    <Formik
      initialValues={{
        name: "",
        club_type_id: "",
        description: "",
        index: "",
        city: "",
        address: "",
        phone: "",
        email: "",
        website: "",
        logotype: null,
        moderator: {
          first_name: "",
          last_name: "",
          email: "",
          phone: "",
        }
      }}
      validationSchema={Yup.object().shape({
        name: Yup.string().required(),
        club_type_id: Yup.number().required(),
        description: Yup.string().required(),
        index: Yup.string(),
        city: Yup.string(),
        address: Yup.string().required(),
        phone: Yup.string().required(),
        email: Yup.string()
          .email()
          .required(),
        website: Yup.string(),
        moderator: Yup.object().shape( {
          first_name: Yup.string().required(),
          last_name: Yup.string().required(),
          email: Yup.string().email().required(),
          phone: Yup.string().required(),
        })
      })}
      onSubmit={handleSubmits}
    >
      {({ handleSubmit, isSubmitting, status }) => (
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col items-start mx-auto hd:w-7/12 p-10">
            {error && (
              <FormGroup className="error text-center">
                <span>{error}</span>
              </FormGroup>
            )}

            <div className="text-4xl font-extrabold">Information</div>
            <div className="flex w-full -mx-3">
              <TextField
                className="px-3 w-1/3"
                inputClassName="w-1/3"
                label="Club name"
                name="name"
                placeholder=""
              />

              <SelectField
                className="px-3 w-1/3"
                inputClassName="w-1/3"
                label="Type"
                name="club_type_id"
                options={[
                  { label: "Sauna club", value: 1 },
                  { label: "Night club", value: 2 }
                ]}
                placeholder=""
              />
            </div>

            <div className="flex w-full -mx-3">
              <TextAreaField
                className="relative px-3 w-2/3"
                label="About club"
                name="description"
                placeholder=""
                rows={7}
                textLength={3000}
              />
              <FileField
                className="px-3 w-1/3"
                label="Logotype"
                name="logotype"
              />
            </div>

            <div className="text-4xl font-extrabold mt-12">
              Club location and contacts
            </div>

            <div className="flex w-full -mx-3">
              <TextField
                className="px-3 w-1/3"
                inputClassName="w-1/3"
                label="Index"
                name="index"
                placeholder=""
              />

              <TextField
                className="px-3 w-1/3"
                inputClassName="w-1/3"
                label="City"
                name="city"
                placeholder=""
              />

              <TextField
                className="px-3 w-1/3"
                inputClassName="w-1/3"
                label="Adress"
                name="address"
                placeholder=""
              />
            </div>

            <div className="flex w-full -mx-3">
              <TextField
                className="px-3 w-1/3"
                inputClassName="w-1/3"
                label="Phone (example +4176 251-15-22)"
                name="phone"
                placeholder="+4179"
              />

              <TextField
                className="px-3 w-1/3"
                inputClassName="w-1/3"
                label="Mail"
                name="email"
                placeholder=""
              />

              <TextField
                className="px-3 w-1/3"
                inputClassName="w-1/3"
                label="Webpage"
                name="website"
                placeholder=""
              />
            </div>

            <div className="text-4xl font-extrabold mt-12">
              Set administrator he gor a for your Club
            </div>

            <div className="flex w-full -mx-3">
              <TextField
                className="px-3 w-1/3"
                inputClassName="w-1/3"
                label="Name"
                name="moderator.first_name"
                placeholder=""
              />

              <TextField
                className="px-3 w-1/3"
                inputClassName="w-1/3"
                label="Last name"
                name="moderator.last_name"
                placeholder=""
              />

              <TextField
                className="px-3 w-1/3"
                inputClassName="w-1/3"
                label="Mail"
                name="moderator.email"
                placeholder=""
              />
            </div>

            <div className="flex w-full -mx-3">
              <TextField
                className="px-3 w-1/3"
                inputClassName="w-1/3"
                label="Club administration phone number"
                name="moderator.phone"
                placeholder="+4179"
              />

              <div className="px-3 w-2/3 flex items-center">
                <Checkbox
                  label="Enable to edit Sex Workers profiles in my Club for this number"
                  name="access_phone_edit"
                />
              </div>
            </div>
          </div>

          <div className="border-b border-divider"></div>

          <div className="flex flex-col items-start mx-auto hd:w-7/12 p-10">
            <Button
              type="submit"
              className="text-xl px-12"
              disabled={isSubmitting}
            >
              Create club account
            </Button>

            <p className="mt-8 text-sm">
              By clicking the "Create Club Account" button, i agree to the terms
              of servece and privacy policy
            </p>
          </div>
        </form>
      )}
    </Formik>
  );
}

NewClubForm.propTypes = {
  onSubmit: PropTypes.func.isRequired
};

export default NewClubForm;