import {useState} from "react";
import cx from "classnames";
import dot from "dot-object";
import PropTypes from "prop-types";
import { Field, useFormikContext } from "formik";
import InputMask from 'react-input-mask';

import { FormGroup } from "UI";

function PhoneField({
  className,
  labelClassName,
  inputClassName,
  label,
  name,
  width,
  before,
  after,
  ...rest
}) {
  const { touched, errors } = useFormikContext();

  const currentTouched = dot.pick(name, touched);
  const currentError = dot.pick(name, errors);

  let error = currentTouched && currentError ? currentError : null;

  if (error && typeof error === 'string') {
    error = error.replace(name, label);
  }

  const [value, setValue] = useState('');

  const beforeMaskedValueChange = (newState, oldState, userInput) => {
    let { value, selection } = newState;

    if (value.substr(4, 1) === '0') {
      value = value.substr(0, 4);
      selection = {
        start: 4,
        end: 4
      };
    }

    setValue(value);

    return {
      value,
      selection
    };
  };

  return (
    <FormGroup
      className={cx(className, "relative")}
      error={!!error}
    >
      <label className={labelClassName} htmlFor={name}>
        {error ? error : label}
      </label>

      <div className="absolute left-0 bottom-0 pb-3-5  ml-6">{before}</div>

      <Field name={name}>
        {({ field }) => (
          <InputMask
            mask="+4179-999-99-99"
            {...rest}
            id={name}
            className={cx("form-control", inputClassName, {
              "pl-10": before
            })}
            {...field}
            value={value}
            style={before ? { paddingLeft: "2.5rem" } : null}
            beforeMaskedValueChange={beforeMaskedValueChange}
          />
        )}
      </Field>

      <div className="absolute right-0 bottom-0 pb-3-5  mr-6">{after}</div>
    </FormGroup>
  );
}

PhoneField.propTypes = {
  className: PropTypes.string,
  labelClassName: PropTypes.string,
  inputClassName: PropTypes.string,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  width: PropTypes.string,
  after: PropTypes.node,
  type: PropTypes.oneOf(["text", "password"])
};

PhoneField.defaultProps = {
  type: "text",
  labelClassName: "text-grey"
};

export default PhoneField;
