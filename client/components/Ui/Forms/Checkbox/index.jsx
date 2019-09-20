import React from "react";
import PropTypes from "prop-types";
import { Field, useFormikContext } from "formik";

function Checkbox({ label, name, bottom, ...rest }) {
  const { touched, errors } = useFormikContext();
  const error = touched[name] && errors[name] ? errors[name] : null;

  return (
    <Field name={name}>
      {({ field }) => (
        <>
          <input
            type="checkbox"
            id={name}
            className="form-control"
            {...field}
            {...rest}
            checked={field.value === true}
          />
          <label
            htmlFor={name}
            style={bottom ? { alignItems: "flex-start" } : null}
          >
            <span />
            <div className="flex flex-col">
              <div>{error ? error : label}</div>
              {bottom && <div className="text-light-grey italic">{bottom}</div>}
            </div>
          </label>
        </>
      )}
    </Field>
  );
}

Checkbox.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
};

export default Checkbox;
