import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import { useFormikContext, FieldArray } from "formik";
import { FormGroup, Dropdown } from "UI";
import {useTranslation} from "react-i18next";

const MultiSelectField = ({
  className,
  labelClassName,
  label,
  name,
  placeholder,
  options,
  showCheckboxes = false
}) => {

  const { values } = useFormikContext();
  const {t, i18n} = useTranslation();

  const getInputWithCheckboxes = (arrayHelpers, category, isChecked) => {
    return (
      <div className="flex">
        <div className="py-1">
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
          <div>
            <span />
          </div>
        </div>

        <span className="capitalize select-none">
          {category.label}
        </span>
      </div>
    )
  };

  const getInputWithoutCheckboxes = (arrayHelpers, category, isChecked) => {
    return (
      <>
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
      </>
    )
  };

  const input = showCheckboxes ? getInputWithCheckboxes : getInputWithoutCheckboxes;

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
              values[name] && values[name].length ? "text-black" : "text-grey"
            )}
          >
            {values[name] && values[name].length
              ? `${t('index.selected')} ${values[name].length} ${t('index.items')}`
              : placeholder}
          </div>
        }
      >
        <FieldArray
          name={name}
          render={arrayHelpers => (
            <div>
              {options.map(category => {
                const isChecked =
                  values[name] && values[name].includes(category.value);

                return (
                  <div key={category.value}>
                    <label
                      className={cx(
                        "cursor-pointer leading-loose hover:text-red",
                        isChecked ? "text-red" : "text-black"
                      )}
                    >
                      {input(arrayHelpers, category, isChecked)}
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
