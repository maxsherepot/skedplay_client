import React, {useState, useEffect} from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import { Field, useFormikContext } from "formik";
import ReactSlider from 'react-slider';
import { FormGroup } from "UI";

const Slider = ({ className, labelClassName, label, name, value: initValue, min = 0, max = 500, valueResolver }) => {
  const { touched, errors, setFieldValue } = useFormikContext();
  const error = touched[name] && errors[name] ? errors[name] : null;

  const [sliderValue, setValue] = useState(initValue || 0);

  useEffect(() => {
        setValue(initValue || 0);
    },
    [initValue]
  );

  function setSliderValue(value) {
    setFieldValue(name, value, false);

    setValue(value);
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
        {({ field: { value, ...rest } }) =>
          <div className="heart-slider-wrap simple">
            <div className="heart-slider-wrap__center">
              {valueResolver(sliderValue)}
            </div>

            <input type="hidden" name={name} value={sliderValue}/>
            <div className="slider-inner-wrap">
              <div className="heart-slider">
                <ReactSlider
                  className="horizontal-slider"
                  thumbClassName="thumb"
                  trackClassName="track"
                  defaultValue={sliderValue}
                  min={min}
                  max={max}
                  pearling
                  value={sliderValue}
                  onChange={value => setSliderValue(value)}
                />
              </div>
            </div>
        </div>}
      </Field>
    </FormGroup>
  );
};

Slider.propTypes = {
  className: PropTypes.string,
  labelClassName: PropTypes.string,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  valueResolver: PropTypes.func
};

Slider.defaultProps = {
  valueResolver: value => value,
};

export default Slider;
