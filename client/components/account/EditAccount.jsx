import React from "react";
import * as Yup from "yup";
import { Formik } from "formik";
import { Button, TextField, PhoneField } from "UI";
import { getErrors } from "utils";

const EditAccount = ({ initialValues, onSubmit }) => {
  const handleSubmits = async (
    { name, email, phone },
    { setSubmitting, setErrors, setError, setStatus }
  ) => {
    try {
      const { data: { updateUser } = {} } = await onSubmit({
        variables: {
          user: initialValues.id,
          input: {
            name,
            email,
            phone
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
        name: Yup.string().required(),
        email: Yup.string()
          .email()
          .required(),
        phone: Yup.string().required()
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

            <TextField className="w-1/3" label="User name" name="name" />

            <TextField className="w-1/3" label="Contact email" name="email" />

            <PhoneField
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
