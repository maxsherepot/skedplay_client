import React, { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import PropTypes from "prop-types";
import { CITIES } from "queries";

import {
  Button,
  CheckboxField,
  FormGroup,
  TextField,
  SelectField,
  TextAreaField,
  FileField,
  LocationSearchInput,
  Loader,
  PhoneField
} from "UI";
import { getErrors } from "utils";
import {useQuery} from "@apollo/react-hooks";

function NewClubForm({ onSubmit }) {
  const [error, setError] = useState(null);

  const { loading: citiesLoading, data: { cities } = {} } = useQuery(
    CITIES
  );

  if (citiesLoading) {
    return <Loader/>;
  }

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
        city_id: "",
        address: "",
        phone: "",
        email: "",
        website: "",
        logotype: null,
        // access_phone_edit: false,
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
        city_id: Yup.number(),
        address: Yup.string().required(),
        phone: Yup.string().required(),
        email: Yup.string()
          .email()
          .required(),
        website: Yup.string().url(),
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

              {/*<TextField*/}
              {/*  className="px-3 w-1/3"*/}
              {/*  inputClassName="w-1/3"*/}
              {/*  label="City"*/}
              {/*  name="city"*/}
              {/*  placeholder=""*/}
              {/*/>*/}

              <SelectField
                className="px-3 w-1/3"
                inputClassName="w-1/3"
                label="City"
                name="city_id"
                options={cities.map(c => ({value: c.id, label: c.name}))}
                placeholder=""
              />

              {/*<TextField*/}
              {/*  className="px-3 w-1/3"*/}
              {/*  inputClassName="w-1/3"*/}
              {/*  label="Adress"*/}
              {/*  name="address"*/}
              {/*  placeholder=""*/}
              {/*/>*/}


              <LocationSearchInput/>
            </div>

            <div className="flex w-full -mx-3">
              <PhoneField
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
              <PhoneField
                className="px-3 w-1/3"
                inputClassName="w-1/3"
                label="Club administration phone number"
                name="moderator.phone"
                placeholder="+4179"
              />

              <div className="px-3 w-2/3 flex items-center">
                <CheckboxField
                  label="Enable to edit Sex Workers profiles in my Club for this number"
                  name="access_phone_edit"
                />
              </div>
            </div>
          </div>

          <div className="border-b border-divider" />

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
