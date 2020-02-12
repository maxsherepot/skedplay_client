import React, {useState} from 'react';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';

import { TextField } from "UI/Forms";
import {useFormikContext} from "formik";

function LocationSearchInput({initAddress}) {
  const [address, setAddress] = useState(initAddress || '');
  const { setFieldValue } = useFormikContext();


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
        <div className="w-full md:w-3/6 px-2 relative">
          <TextField
            inputClassName="w-full md:w-3/6"
            label="Address"
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

export default LocationSearchInput;