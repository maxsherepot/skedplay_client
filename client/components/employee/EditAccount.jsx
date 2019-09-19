import React from "react";
import * as Yup from "yup";
import { Formik } from "formik";
import { Button, TextField } from "UI";
import { getErrors } from "utils";

const EditAccount = ({ initialValues, onSubmit }) => {
  const handleSubmits = async (
    { name, email, phone },
    { setSubmitting, setErrors }
  ) => {
    try {
      await onSubmit({
        variables: {
          user: initialValues.id,
          input: {
            name,
            email,
            phone
          }
        }
      });

      console.log("success! redirect");
    } catch (e) {
      if (getErrors(e) instanceof Object) {
        setErrors(getErrors(e));
      }
    }

    setSubmitting(false);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={Yup.object().shape({
        name: Yup.string().required(),
        email: Yup.string()
          .email()
          .required(),
        phone: Yup.string().required()
      })}
      onSubmit={handleSubmits}
    >
      {({ handleSubmit, isSubmitting }) => (
        <form onSubmit={handleSubmit}>
          <div className="px-2">
            <TextField className="w-1/3" label="User name" name="name" />

            <TextField className="w-1/3" label="Contact email" name="email" />

            <TextField
              className="w-1/3"
              label="Contact phone number"
              name="phone"
            />

            <Button
              type="submit"
              className="px-8"
              size="sm"
              disabled={isSubmitting}
            >
              Save changes
            </Button>
          </div>
        </form>
      )}
    </Formik>
  );
};

export default EditAccount;
