import React from "react";
import { Formik, validateYupSchema, yupToFormErrors } from "formik";
import { Button, TextField, TextAreaField, SelectField } from "UI";

const EditEmployee = ({ initialValues, children }) => {
  const validate = values => {
    // if (activeStep.props.validationSchema) {
    //   try {
    //     validateYupSchema(values, activeStep.props.validationSchema, true);
    //   } catch (err) {
    //     return yupToFormErrors(err);
    //   }
    // }

    return {};
  };

  const handleSubmits = async (
    values,
    { setSubmitting, setErrors, setStatus }
  ) => {
    console.log(111, values);
  };

  return (
    <Formik
      initialValues={initialValues}
      validate={validate}
      onSubmit={handleSubmits}
    >
      {({ handleSubmit, isSubmitting, status }) => (
        <form onSubmit={handleSubmit}>
          <div className="px-2">
            <div className="flex flex-wrap -mx-2 mb-4">
              <TextField
                className="w-2/12 px-2"
                inputClassName="w-2/12"
                label="Name"
                name="first_name"
              />

              <TextField
                className="w-2/12 px-2"
                inputClassName="w-2/12"
                label="Second name"
                name="last_name"
              />

              <TextField
                className="w-4/12 px-2"
                inputClassName="w-3/12"
                label="Address"
                name="address"
              />
            </div>

            <div className="flex flex-wrap -mx-2 mb-4">
              <TextField
                className="w-4/12 px-2"
                inputClassName="w-2/12"
                label="Age"
                name="age"
              />

              <SelectField
                className="w-4/12 px-2"
                inputClassName="w-2/12"
                label="Type"
                name="race_type_id"
                placeholder=""
                options={[
                  { label: "European", value: 1 },
                  { label: "Asian", value: 2 },
                  { label: "African", value: 3 }
                ]}
              />
            </div>

            <div className="flex flex-wrap -mx-2 mb-4">
              <TextField
                className="w-8/12 px-2"
                inputClassName="w-8/12"
                label="Short description"
                name="description"
              />
            </div>

            <div className="flex flex-wrap -mx-2 mb-4">
              <TextAreaField
                className="w-8/12 px-2"
                label="About me"
                name="about"
              />
            </div>

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

export default EditEmployee;
