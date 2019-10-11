import React, { useState } from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import { useFormikContext } from "formik";
import { FormGroup } from "UI";
import { WhiteTrashSvg } from "icons";

function MultiVideoField({
  className,
  labelClassName,
  label,
  name,
  accept,
  children
}) {
  const [hovered, setHovered] = useState(null);
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

      <div className="px-2 mb-8">
        <div className="flex flex-wrap items-center -mx-4">
          {previews.map((preview, i) => (
            <div
              className="rounded-lg px-3"
              key={i}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              <div className="relative w-full mb-6">
                <div className="w-full md:w-80">
                  <video className="rounded-lg">
                    <source src={preview} type="video/mp4" />
                  </video>
                </div>

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
            </div>
          ))}

          {/* Todo: Add plan's constrait! */}
          {previews.length < 2 && (
            <label
              className="relative px-3"
              style={{ paddingLeft: 0, marginBottom: 0 }}
            >
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
          )}
        </div>
      </div>
    </FormGroup>
  );
}

MultiVideoField.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  accept: PropTypes.string
};

MultiVideoField.defaultProps = {
  accept: "video/mp4,video/x-m4v,video/*"
};

export default MultiVideoField;
