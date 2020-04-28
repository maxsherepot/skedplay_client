import React from "react";
import PropTypes from "prop-types";
import { FormGroup, CheckboxField } from "UI";
import { FieldArray, useFormikContext } from "formik";

function GroupCheckbox({
  className,
  label,
  name,
  items,
  handleChange,
  defaultValue
}) {
  const { values, error, setFieldValue } = useFormikContext();

  if (!items) return null;

  const onChange = (checked, value) => {
    let checkValues = values[name];
    const valueIndex = values[name].findIndex(v => parseInt(v) === parseInt(value));

    if (valueIndex === -1 && checked) {
      checkValues.push(value);
    } else if (valueIndex !== -1 && !checked) {
      checkValues.splice(valueIndex, 1);
    }

    setFieldValue(name, checkValues);
  };

  return (
    <FormGroup className={className}>
      <label className="text-grey" htmlFor={name}>
        {label}
      </label>
      <div className="flex flex-wrap items-center justify-between mt-4">
        {items.map((item, index) => {
          return (
            <CheckboxField
              key={index}
              labelStyle={{
                display: 'flex',
              }}
              label={item.name}
              name={null}
              checkedOnlyByProp={true}
              checked={!!values[name].find(i => parseInt(i) === parseInt(item.value))}
              onChange={(checked) => onChange(checked, item.value)}
            />
          );
        })}
      </div>
    </FormGroup>
  );
}

GroupCheckbox.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired,
  handleChange: PropTypes.func,
  defaultValue: PropTypes.string
};

export default GroupCheckbox;
