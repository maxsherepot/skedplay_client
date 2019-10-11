import React, { useState } from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import { useFormikContext } from "formik";
import { FormGroup, CheckboxField } from "UI";
import { WhiteTrashSvg } from "icons";

function MultiPhotoField({
  className,
  labelClassName,
  label,
  name,
  accept,
  children
}) {
  const [hovered, setHovered] = useState(null);
  const [index, setIndex] = useState(null);
  const [indexes, setIndexes] = useState([]);
  const [previews, setPreviews] = useState([]);

  const { touched, errors, setFieldValue } = useFormikContext();
  const error = touched[name] && errors[name] ? errors[name] : null;

  const handleChange = ({ target: { validity, files } }) => {
    console.log(validity.valid);
    if (validity.valid) {
      let uploaded = [];

      Object.keys(files).map(key =>
        uploaded.push(URL.createObjectURL(files[key]))
      );

      setPreviews(uploaded);
      setIndexes(Object.keys(files));

      setFieldValue(name, files);
    }
  };

  const handleDelete = i => {
    previews.splice(i, 1);
    setPreviews([...previews]);
  };

  return (
    <FormGroup
      className={cx(className, "relative")}
      error={error ? true : false}
    >
      <label className={labelClassName} htmlFor={name}>
        {error ? error : label}
      </label>

      <>
        <div className="px-2 mb-8">
          <div className="flex flex-wrap items-center -mx-4">
            {previews.map((preview, i) => (
              <div
                className="relative w-full md:w-38 rounded-lg px-2 mb-6 md:mb-0"
                key={i}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
              >
                <div className="relative">
                  <img
                    className="rounded-lg object-cover h-photo sm:h-photo-sm md:h-e-photo-md lg:h-e-photo-lg hd:h-e-photo-hd"
                    src={preview}
                  />

                  {hovered === i && (
                    <div className="absolute top-0 right-0 z-50 cursor-pointer">
                      <div
                        className="flex items-center justify-center w-6 h-6 bg-red rounded-bl-lg rounded-tr-lg"
                        onClick={() => handleDelete(i)}
                      >
                        <WhiteTrashSvg />
                      </div>
                    </div>
                  )}
                </div>

                <div className="absolute inset-0 flex items-end">
                  <CheckboxField
                    className="text-white"
                    label="Main photo"
                    name={indexes[i]}
                    checked={index === i}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <label className="relative" style={{ paddingLeft: 0 }}>
          {children}
          <input
            className="absolute inset-0 opacity-0 w-full cursor-pointer z-20"
            type="file"
            accept={accept}
            required
            multiple
            onChange={handleChange}
          />
        </label>
      </>
    </FormGroup>
  );
}

MultiPhotoField.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  accept: PropTypes.string
};

MultiPhotoField.defaultProps = {
  accept: "image/*"
};

export default MultiPhotoField;
