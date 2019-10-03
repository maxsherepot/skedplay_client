import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import PropTypes from "prop-types";

import { Button, FormGroup, TextField } from "UI";
import { getErrors } from "utils";

function NewAdForm({ onSubmit }) {
  const handleSubmits = async (
    values,
    { setSubmitting, setErrors, setStatus }
  ) => {
    setStatus(null);

    console.log(555);
  };

  return (
    <Formik
      initialValues={{
        account_type: "client",
        service_for: []
      }}
      validationSchema={Yup.object().shape({
        username: Yup.string().required(),
        password: Yup.string().required(),
        recaptcha: Yup.string().required()
      })}
      onSubmit={handleSubmits}
    >
      {({ handleSubmit, isSubmitting, status }) => (
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col items-start mx-auto hd:w-7/12 my-5">
            <div className="p-8 hd:p-0">
              {status && (
                <FormGroup className="error text-center">
                  <span>{status}</span>
                </FormGroup>
              )}
              <div className="text-4xl font-bold">Information</div>
              <div className="flex">
                <TextField label="Club_name" name="name" placeholder="" />
              </div>
            </div>
          </div>
          <div className="border-b border-divider"></div>
          {/* afaf */}
          {/* <Button
            type="submit"
            className="text-xl min-w-full"
            disabled={isSubmitting}
          >
            {isLastStep ? "Save ad" : "Next"}
          </Button> */}
        </form>
      )}
    </Formik>
  );
}

NewAdForm.Step = ({ children }) => children;

NewAdForm.propTypes = {
  onSubmit: PropTypes.func.isRequired
};

export default NewAdForm;
