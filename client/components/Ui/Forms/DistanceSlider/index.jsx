import React, {useState, useEffect} from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import { Field, useFormikContext } from "formik";
import { FormGroup, Slider } from "UI";
import { geolocated } from "react-geolocated";

const DistanceSlider = ({ value: initValue, name, isGeolocationEnabled, coords, ...props }) => {
  const { setFieldValue } = useFormikContext();

  useEffect(() => {
    if (isGeolocationEnabled && coords) {
      setFieldValue(`${name}[lat]`, coords.latitude);
      setFieldValue(`${name}[lng]`, coords.longitude);
    }
  }, [coords]);

  if (!isGeolocationEnabled || !coords) {
    return null;
  }

  return (
    <>
      <FormGroup>
        <Field name={`${name}[lat]`}>
          {({ field: { value, ...rest } }) =>
            <>
              <input type="hidden" name={`${name}[lat]`} value={coords.latitude}/>
            </>
          }
        </Field>
      </FormGroup>

      <FormGroup>
        <Field name={`${name}[lng]`}>
          {({ field: { value, ...rest } }) =>
            <>
              <input type="hidden" name={`${name}[lng]`} value={coords.longitude}/>
            </>
          }
        </Field>
      </FormGroup>

      <Slider
        name={`${name}[distanceKm]`}
        value={initValue ? initValue.distanceKm || 0 : 0}
        {...props}
      />
    </>
  );
};

DistanceSlider.propTypes = {
  className: PropTypes.string,
  labelClassName: PropTypes.string,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  valueResolver: PropTypes.func
};

DistanceSlider.defaultProps = {
  valueResolver: value => value,
};

export default geolocated()(DistanceSlider);
