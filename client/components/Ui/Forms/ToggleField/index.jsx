import React, {useState} from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import { Toggle } from "UI";

function ToggleField({ className, trueLabel, falseLabel, initValue, onChange }) {
  const [value, setValue] = useState(initValue);

  const handleChange = event => {
    setValue(!value);

    if (onChange) {
      onChange(!value);
    }
  };

  return (
    <label className={cx("form-control relative cursor-pointer", className)} onClick={handleChange}>
      <Toggle
        checked={value}
        trueLabel={trueLabel}
        falseLabel={falseLabel}
      />
    </label>
  );
}

ToggleField.propTypes = {
  className: PropTypes.string,
  trueLabel: PropTypes.string.isRequired,
  falseLabel: PropTypes.string.isRequired,
};

export default ToggleField;
