import React from "react";
import { Formik, validateYupSchema, yupToFormErrors } from "formik";
import { Button, TextField, TextAreaField, SelectField } from "UI";

const EditServices = ({ initialValues: { prices, services }, children }) => {
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

  const hydrate = values => {
    let result = {};

    values.map(v => {
      result[v.id] = v.pivot.price;
    });

    return result;
  };

  let initPrices = hydrate(prices);
  let initServices = hydrate(services);

  return (
    <Formik
      initialValues={{
        prices: {
          ...initPrices
        },
        services: {
          ...initServices
        }
      }}
      validate={validate}
      onSubmit={handleSubmits}
    >
      {({ handleSubmit, isSubmitting, status }) => (
        <form onSubmit={handleSubmit}>
          <div className="px-2">
            <div className="text-xl px-2 mb-5">My Price-list</div>

            <div className="flex flex-wrap -mx-2">
              {prices &&
                prices.map(price => (
                  <TextField
                    className="w-1/12 px-2"
                    inputClassName="w-1/12"
                    label={price.name}
                    name={`prices.${price.id}`}
                    value={price.pivot.price}
                    after={<span>$</span>}
                  ></TextField>
                ))}
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

export default EditServices;
