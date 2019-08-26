import React from "react";
import PropTypes from "prop-types";
import { Field, useFormikContext } from "formik";
import { FormGroup, Button } from "components/Ui";

function ButtonsField({ className, label, name, options }) {
  const { touched, errors, setFieldValue } = useFormikContext();
  const error = touched[name] && errors[name] ? errors[name] : null;

  if (!options) return null;

  return (
    <FormGroup className={className} error={error ? true : false}>
      <label htmlFor={name}>{error ? error : label}</label>

      <div className="flex justify-between -mx-2">
        <Field name={name}>
          {({ field }) =>
            options.map(option => {
              const isActive = field.value === option.value;

              return (
                <Button
                  key={option.value}
                  className="mx-1 w-48"
                  level={isActive ? "primary" : "secondary"}
                  size="sm"
                  outline={!isActive}
                  onClick={() => setFieldValue(name, option.value)}
                >
                  {option.name}
                </Button>
              );
            })
          }
        </Field>
      </div>
    </FormGroup>
  );
}

ButtonsField.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired
};

export default ButtonsField;
