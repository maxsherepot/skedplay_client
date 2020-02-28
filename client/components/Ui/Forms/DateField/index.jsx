import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import { Field, useFormikContext } from "formik";

import { FormGroup, Dropdown } from "UI";
import dot from "dot-object";

import formErrors from "services/formErrors";

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
  const { values, touched, errors, setFieldValue } = useFormikContext();
  const error = formErrors.getErrorText(name, label, touched, errors);

  const dateValue = formErrors.getFieldValue(values, name);

  const dateInitialValue = !dateValue || !dateValue.length ? "" : new Date(dateValue);

  const [date, setDateState] = useState(dateInitialValue);

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
              placeholderText={placeholder}
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
  placeholder: PropTypes.string,
  name: PropTypes.string.isRequired
};

DateField.defaultProps = {
  labelClassName: "text-grey"
};

export default DateField;
