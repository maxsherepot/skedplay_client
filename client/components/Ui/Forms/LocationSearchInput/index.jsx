import React, {useState} from 'react';
import PlacesAutocomplete, {geocodeByAddress} from 'react-places-autocomplete';

import {TextField} from "UI/Forms";
import {useFormikContext} from "formik";
import PropTypes from "prop-types";
import cx from 'classnames';
import {useTranslation} from "react-i18next";

function LocationSearchInput({initAddress, className, inputClassName, defaultValue, name, styles}) {
  const [address, setAddress] = useState(initAddress);
  const { setFieldValue } = useFormikContext();

  const fieldName = name || 'address';

  const {t, i18n} = useTranslation();

  if (typeof document === 'undefined') {
    return '';
  }

  const handleChange = address => {
    setAddress(address);
    setFieldValue(fieldName, address);
  };

  const handleSelect = address => {
    setAddress(address);
    setFieldValue(fieldName, address);

    if (address) {
      geocodeByAddress(address)
        .then(results => {
          if (!results) {
            return;
          }

          let index;

          for (let i in results) {
            for (let k in results[i].address_components) {
              for (let j in results[i].address_components[k].types) {
                if (results[i].address_components[k].types[j] === "postal_code") {
                  index = results[i].address_components[k].long_name;
                  break;
                }
              }
            }
          }

          if (index) {
            setFieldValue('index', index);
          }
        })
    }
  };

  const searchOptions = {
    location: new google.maps.LatLng(46.972892, 8.218029),
    radius: 60000,
  };

  return (
    <PlacesAutocomplete
      value={address}
      onChange={handleChange}
      onSelect={handleSelect}
      searchOptions={searchOptions}
    >
      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
        <div
          className={cx([
            className,
            'relative',
          ])}
          style={styles}
        >
          <TextField
            inputClassName={cx([
              inputClassName,
            ])}
            label={t('index.address')}
            defaultValue={defaultValue ? defaultValue : ""}
            placeholder="Example: street name, city"
            name={fieldName}
            {...getInputProps({
              className: 'location-search-input',
            })}
          />
          {!!suggestions.length &&
          <div className="autocomplete-dropdown-container">
            {suggestions.filter(suggestion =>
                ((suggestion.description.endsWith(', Switzerland'))
                    || (suggestion.description.endsWith(', Швейцария'))))
                .map(suggestion => {
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