import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import { Field, useFormikContext } from "formik";

import { FormGroup, Dropdown } from "UI";
import dot from "dot-object";
// import DatePicker from 'react-date-picker';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

function DateField({
  className,
  labelClassName,
  label,
  name,
  placeholder,
  disabled
}) {
  const [date, setDateState] = useState(new Date());
  const { touched, errors, setFieldValue } = useFormikContext();
  const currentTouched = dot.pick(name, touched);
  const currentError = dot.pick(name, errors);

  let error = currentTouched && currentError ? currentError : null;

  if (error) {
    error = error.replace(name, label);
  }

  function setDate(date) {
    setDateState(date);
    setFieldValue(name, date, false);
  }

  return (
    <FormGroup
      className={cx(className, "relative")}
      error={!!error}
    >
      <label className={labelClassName} htmlFor={name}>
        {error ? error : label}
      </label>

      <Field name={name}>
        {({ field: { value, ...rest } }) => (
          <>
            <DatePicker
              name={name}
              dateFormat="dd.MM.yyyy"
              selected={date}
              onChange={date => setDate(date)}
            />
          </>
        )}
      </Field>
    </FormGroup >
  );
}

DateField.propTypes = {
  className: PropTypes.string,
  labelClassName: PropTypes.string,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
};

DateField.defaultProps = {
  labelClassName: "text-grey"
};

export default DateField;
