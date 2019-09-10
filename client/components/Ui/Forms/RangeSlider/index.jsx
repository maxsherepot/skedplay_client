import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import { Range } from "rc-slider";
import { Field, useFormikContext } from "formik";

import { FormGroup } from "UI";

const RangeSlider = ({ className, labelClassName, label, name }) => {
  const { touched, errors, setFieldValue } = useFormikContext();
  const error = touched[name] && errors[name] ? errors[name] : null;

  return (
    <FormGroup
      className={cx(className, "relative")}
      error={error ? true : false}
    >
      <label className={labelClassName} htmlFor={name}>
        {error ? error : label}
      </label>

      <Field name={name}>{({ field: { value, ...rest } }) => <Range />}</Field>
    </FormGroup>
  );
};

RangeSlider.propTypes = {
  className: PropTypes.string,
  labelClassName: PropTypes.string,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
};

export default RangeSlider;
