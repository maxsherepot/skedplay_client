import React from "react";
import PropTypes from "prop-types";
import { FormGroup } from "UI";
import { FieldArray, useFormikContext } from "formik";

function GroupCheckbox({
  className,
  label,
  name,
  items,
  handleChange,
  defaultValue
}) {
  const { values, error } = useFormikContext();

  if (!items) return null;

  return (
    <FormGroup className={className}>
      <FieldArray
        name="categoryIds"
        render={arrayHelpers => (
          <>
            <label className="text-grey" htmlFor={name}>
              {label}
            </label>
            <div className="flex items-center justify-between mt-4">
              {items.map((item, index) => {
                return (
                  <div
                    key={item.value}
                    // onClick={e => {

                    // }}
                  >
                    <input
                      type="checkbox"
                      className="form-control"
                      value={item.value}
                    />
                    <label
                      htmlFor={item.name}
                      onClick={() => {
                        const checked = values[name].includes(item.value);

                        if (!checked) {
                          arrayHelpers.push(item.value);
                        } else {
                          const idx = values[name].indexOf(item.value);
                          arrayHelpers.remove(idx);
                        }
                      }}
                    >
                      <span />
                      <div className="flex flex-col">
                        <div>{error ? error : item.name}</div>
                      </div>
                    </label>
                  </div>
                );
                // <Fragment key={indexName}>
                // {
                /* <input
              type="radio"
              id={indexName}
              name={indexName}
              value={item.value}
              checked={defaultValue == item.value}
              onChange={handleChange}
            />
            <label htmlFor={indexName}>{item.name}</label> */
                // }
                // </Fragment>
              })}
            </div>
          </>
        )}
      />
    </FormGroup>
  );
}

GroupCheckbox.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired,
  handleChange: PropTypes.func.isRequired,
  defaultValue: PropTypes.string
};

export default GroupCheckbox;
