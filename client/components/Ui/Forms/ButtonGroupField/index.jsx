import React from "react";
import PropTypes from "prop-types";
import { Field, useFormikContext } from "formik";
import { FormGroup, Button } from "components/Ui";

function ButtonGroupField({ className, label, name, items }) {
  const { touched, errors, setFieldValue } = useFormikContext();
  const error = touched[name] && errors[name] ? errors[name] : null;

  if (!items) return null;

  return (
    <FormGroup className={className} error={error ? true : false}>
      <label htmlFor={name}>{error ? error : label}</label>

      <div className="flex -mx-2">
        <Field name={name}>
          {({ field }) =>
            items.map(item => {
              const isActive = field.value === item.value;

              return (
                <Button
                  key={item.value}
                  className="mx-1 w-48"
                  level={isActive ? "primary" : "secondary"}
                  size="sm"
                  outline={!isActive}
                  onClick={() => setFieldValue(name, item.value)}
                >
                  {item.name}
                </Button>
              );
            })
          }
        </Field>
      </div>
    </FormGroup>
  );
}

ButtonGroupField.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired
};

export default ButtonGroupField;
