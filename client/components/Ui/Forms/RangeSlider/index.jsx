import React, {useState} from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import { Range } from "rc-slider";
import { Field, useFormikContext } from "formik";
import ReactSlider from 'react-slider';

import { FormGroup } from "UI";

const RangeSlider = ({ className, labelClassName, label, name, from, to }) => {
  const { touched, errors, setFieldValue } = useFormikContext();
  const error = touched[name] && errors[name] ? errors[name] : null;

  const [start, setStart] = useState(from);
  const [end, setEnd] = useState(to);

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
          <>
            <input type="hidden" name={`[${name}][from]`} value={start}/>
            <input type="hidden" name={`[${name}][to]`} value={end}/>
            <ReactSlider
              className="horizontal-slider"
              thumbClassName="example-thumb"
              trackClassName="example-track"
              defaultValue={[start, end]}
              min={18}
              max={45}
              ariaLabel={['Lower thumb', 'Upper thumb']}
              ariaValuetext={state => `Thumb value ${state.valueNow}`}
              renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
              pearling
              minDistance={1}
              onChange={([start, end]) => setRange(start, end)}
            />
        </>}
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
