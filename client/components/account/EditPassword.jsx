import React from "react";
import * as Yup from "yup";
import { Formik } from "formik";
import { Button, TextField } from "UI";
import { getErrors } from "utils";

const EditPassword = ({ initialValues, onSubmit }) => {
  const handleSubmits = async (
    { password, new_password, new_password_confirmation },
    { setSubmitting, setErrors, setError, setStatus }
  ) => {
    try {
      const { data: { updateUser } = {} } = await onSubmit({
        variables: {
          input: {
            password,
            new_password,
            new_password_confirmation
          }
        }
      });
      if (updateUser && updateUser.status) {
        setStatus(updateUser.message);
      } else {
        setError(updateUser.message);
      }
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
        password: Yup.string().required(),
        new_password: Yup.string().required(),
        new_password_confirmation: Yup.string().required()
      })}
      onSubmit={handleSubmits}
    >
      {({ handleSubmit, isSubmitting, status }) => (
        <form onSubmit={handleSubmit}>
          <div className="px-2">
            {status && (
              <div className="text-dark-green text-white px-1 mb-3">
                {status}
              </div>
            )}

            <TextField
              className="w-1/3"
              label="Current password"
              name="password"
            />

            <TextField
              className="w-1/3"
              label="New password"
              name="new_password"
            />

            <TextField
              className="w-1/3"
              label="Confirm new password"
              name="new_password_confirmation"
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

export default EditPassword;
