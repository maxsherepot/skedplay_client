import React from "react";
import cx from "classnames";
import dot from "dot-object";
import PropTypes from "prop-types";
import { Field, useFormikContext } from "formik";
import InputMask from 'react-input-mask';
import MaskInput from 'react-maskinput';

import { FormGroup, Label } from "UI";
import formErrors from "services/formErrors";

function DateRawField({
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
  const { touched, errors, values } = useFormikContext();

  const error = formErrors.getErrorText(name, label, touched, errors);

  const [value, setValue] = React.useState(dot.pick(name, values) || values[name] || '');
  const [mask, setMask] = React.useState('00.00.0000');
  const [maskString, setMaskString] = React.useState('dd.mm.yyyy');

  const onChange = e => {
    setMaskString('dd.mm.yyyy');
    setMask('00.00.0000');

    let value = e.target.value;

    let valueItems = value.split('.');

    if (valueItems[0] && valueItems[0].length === 2) {
      if (parseInt(valueItems[0]) > 31) {
        valueItems[0] = '31';
      } else if (parseInt(valueItems[0]) < 1) {
        valueItems[0] = '01';
      }
    }

    if (valueItems[1] && valueItems[1].length === 2) {
      if (parseInt(valueItems[1]) > 12) {
        valueItems[1] = '12';
      } else if (parseInt(valueItems[1]) < 1) {
        valueItems[1] = '01';
      }
    }

    if (valueItems[2] && valueItems[2].length === 4) {
      if (parseInt(valueItems[2]) > new Date().getFullYear()) {
        valueItems[2] = new Date().getFullYear();
      }
      else if (parseInt(valueItems[2]) > ((new Date().getFullYear()) - 18)) {
        valueItems[2] = (new Date().getFullYear() - 18);
      }

      else if (parseInt(valueItems[2]) < ((new Date().getFullYear()) - 60)) {
        valueItems[2] = ((new Date().getFullYear()) - 60);
      }
    }
    setValue(valueItems.join('.'));
  };

  const cursorToStart = (e) => {
    if (value !== '') {
      return;
    }

    e.target.selectionStart = 0;
    e.target.selectionEnd = 0;
  };

  return (
    <FormGroup
      className={cx(className, "relative")}
      error={!!error}
    >
      <Label
        name={name}
        className={labelClassName}
        label={label}
        error={error}
      />

      <div className="absolute left-0 bottom-0 pb-3-5  ml-6">{before}</div>

      <Field name={name}>
        {({ field }) => (
          <MaskInput
            {...field}
            onChange={(e) => {onChange(e);field.onChange(e)}}
            onClick={cursorToStart}
            id={name}
            alwaysShowMask
            value={value}
            maskString={maskString}
            mask={mask}
            size={20}
            {...rest}
            className={cx("form-control", inputClassName, {
              "pl-10": before
            })}
            style={before ? { paddingLeft: "2.5rem" } : null}
          />
        )}
      </Field>

      <div className="absolute right-0 bottom-0 pb-3-5  mr-6">{after}</div>
    </FormGroup>
  );
}

DateRawField.propTypes = {
  className: PropTypes.string,
  labelClassName: PropTypes.string,
  inputClassName: PropTypes.string,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  width: PropTypes.string,
  after: PropTypes.node,
  type: PropTypes.oneOf(["text", "password"])
};

DateRawField.defaultProps = {
  type: "text",
  labelClassName: "text-grey"
};

export default DateRawField;
