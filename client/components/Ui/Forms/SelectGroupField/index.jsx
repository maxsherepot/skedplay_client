import React from "react";
import PropTypes from "prop-types";
import { useFormikContext } from "formik";
import { FormGroup } from "UI";

function SelectGroupField({ className, label, name, children }) {
  const { touched, errors } = useFormikContext();
  const error = touched[name] && errors[name] ? errors[name] : null;

  return (
    <FormGroup className={className} error={error ? true : false}>
      <label className="text-grey" htmlFor={name}>
        {error ? error : label}
      </label>

      <div className="button-group">
        {children}
      </div>
    </FormGroup>
  );
}

SelectGroupField.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default SelectGroupField;
