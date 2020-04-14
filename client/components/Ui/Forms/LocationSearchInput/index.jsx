import React, {useState} from 'react';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';

import { TextField } from "UI/Forms";
import {useFormikContext} from "formik";
import PropTypes from "prop-types";
import cx from 'classnames';
import {useTranslation} from "react-i18next";

function LocationSearchInput({initAddress, className, inputClassName}) {
  const [address, setAddress] = useState(initAddress);
  const { setFieldValue } = useFormikContext();

  const {t, i18n} = useTranslation();

  const handleChange = address => {
    setAddress(address);
    setFieldValue('address', address);
  };

  const handleSelect = address => {
    setAddress(address);
    setFieldValue('address', address);
  };

  return (
    <PlacesAutocomplete
      value={address}
      onChange={handleChange}
      onSelect={handleSelect}
    >
      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
        <div className={cx([
          className,
          'relative',
        ])}>
          <TextField
            inputClassName={cx([
              inputClassName,
            ])}
            label={t('index.address')}
            placeholder="Example: street name, city"
            name="address"
            {...getInputProps({
              className: 'location-search-input',
            })}
          />
          {!!suggestions.length &&
          <div className="autocomplete-dropdown-container">
            {suggestions.map(suggestion => {
              const className = suggestion.active
                ? 'suggestion-item--active'
                : 'suggestion-item';
              // inline style for demonstration purpose
              const style = suggestion.active
                ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                : { backgroundColor: '#ffffff', cursor: 'pointer' };
              return (
                <div
                  {...getSuggestionItemProps(suggestion, {
                    className,
                    style,
                  })}
                >
                  <span>{suggestion.description}</span>
                </div>
              );
            })}
          </div>
          }
        </div>
      )}
    </PlacesAutocomplete>
  );
}

LocationSearchInput.propTypes = {
  initAddress: PropTypes.string,
  className: PropTypes.string,
  inputClassName: PropTypes.string,
};

LocationSearchInput.defaultProps = {
  initAddress: '',
  className: 'w-full md:w-3/6 px-2',
  inputClassName: 'w-full md:w-3/6',
};

export default LocationSearchInput;