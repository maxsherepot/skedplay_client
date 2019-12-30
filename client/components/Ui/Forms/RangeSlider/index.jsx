import React, {useState, useEffect} from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import { Field, useFormikContext } from "formik";
import ReactSlider from 'react-slider';
import { FormGroup } from "UI";

const RangeSlider = ({ className, labelClassName, label, name, value: {from, to}, min = 18, max = 45 }) => {
  const { touched, errors, setFieldValue } = useFormikContext();
  const error = touched[name] && errors[name] ? errors[name] : null;

  const [start, setStart] = useState(from);
  const [end, setEnd] = useState(to);

  useEffect(() => {
      setStart(from);
      setEnd(to);
    },
    [from, to]
  );

  function setRange(start, end) {
    setFieldValue('age[from]', start, false);
    setFieldValue('age[to]', end, false);

    setStart(start);
    setEnd(end);
  }

  return (
    <FormGroup
      className={cx(className, "relative")}
      error={error ? true : false}
    >
      <label className={labelClassName} htmlFor={name}>
        {error ? error : label}
      </label>

      <Field name={name}>
        {({ field: { value, ...rest } }) =>
          <div className="heart-slider-wrap">
            <div className="heart-slider-wrap__from">
              {start}
            </div>
            <div className="heart-slider-wrap__to">
              {end}
            </div>

            <input type="hidden" name={`${name}[from]`} value={start}/>
            <input type="hidden" name={`${name}[to]`} value={end}/>
            <div className="slider-inner-wrap">
              <div className="heart-slider">
                <ReactSlider
                  className="horizontal-slider"
                  thumbClassName="thumb"
                  trackClassName="track"
                  defaultValue={[from, to]}
                  min={min}
                  max={max}
                  pearling
                  minDistance={1}
                  value={[start, end]}
                  onChange={([start, end]) => setRange(start, end)}
                />
              </div>
            </div>
        </div>}
      </Field>
    </FormGroup>
  );
};

RangeSlider.propTypes = {
  className: PropTypes.string,
  labelClassName: PropTypes.string,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
};

export default RangeSlider;
