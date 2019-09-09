import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import { useFormikContext, FieldArray } from "formik";
import { FormGroup, Dropdown } from "UI";

const MultiSelectField = ({
  className,
  labelClassName,
  label,
  name,
  placeholder,
  options
}) => {
  const { values } = useFormikContext();

  return (
    <FormGroup className={cx(className, "relative")}>
      <label className={labelClassName} htmlFor={name}>
        {label}
      </label>

      <Dropdown
        trigger={
          <div
            className={cx(
              "flex items-center h-full pl-4 text-sm",
              values[name].length ? "text-black" : "text-grey"
            )}
          >
            {values[name].length
              ? `Selected ${values[name].length} items`
              : placeholder}
          </div>
        }
      >
        <FieldArray
          name={name}
          render={arrayHelpers => (
            <div>
              {options.map(category => {
                const isChecked = values[name].includes(category.value);

                return (
                  <div key={category.value}>
                    <label
                      className={cx(
                        "cursor-pointer leading-loose hover:text-red",
                        isChecked ? "text-red" : "text-black"
                      )}
                    >
                      <input
                        name={name}
                        type="checkbox"
                        value={category.value}
                        checked={isChecked}
                        onChange={e => {
                          if (e.target.checked)
                            arrayHelpers.push(category.value);
                          else {
                            const idx = values[name].indexOf(category.value);
                            arrayHelpers.remove(idx);
                          }
                        }}
                      />
                      <span className="capitalize select-none">
                        {category.label}
                      </span>
                    </label>
                  </div>
                );
              })}
            </div>
          )}
        />
      </Dropdown>
    </FormGroup>
  );
};

MultiSelectField.propTypes = {
  className: PropTypes.string,
  labelClassName: PropTypes.string,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
};

export default MultiSelectField;
