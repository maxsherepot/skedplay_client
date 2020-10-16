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

  const distanceKm = initValue ? initValue.distanceKm || 0 : 0;

  return (
    <>
      {!!distanceKm &&
        <>
          <input type="hidden" name={`${name}[lat]`} value={coords.latitude}/>
          <input type="hidden" name={`${name}[lng]`} value={coords.longitude}/>
        </>
      }

      <Slider
        name={`${name}[distanceKm]`}
        value={distanceKm}
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
