import React, { useState } from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import { useFormikContext } from "formik";
import { FormGroup } from "UI";
import { WhiteTrashSvg } from "icons";
import { DELETE_MEDIA } from "queries";
import { useMutation } from "@apollo/react-hooks";
import formErrors from "services/formErrors";

const DisplayPreviews = ({ videos, indexes, setPreviews }) => {
  const [deleteMedia] = useMutation(DELETE_MEDIA);
  const [hovered, setHovered] = useState(null);

  const handleDelete = (i, id) => {
    if (id) {
      deleteMedia({
        variables: {
          id
        }
      })
    }

    videos.splice(i, 1);
    setPreviews([...videos]);
  };

  return videos.map((preview, i) => (
      <div
          className="rounded-lg px-3"
          key={i}
          onMouseEnter={() => setHovered(i)}
          onMouseLeave={() => setHovered(null)}
      >
        <div className="relative w-full mb-6">
          <div className="w-full md:w-70">
            <video className="rounded-lg">
              <source src={preview && preview.url} type="video/mp4" />
            </video>
          </div>

          {hovered === i && (
              <div className="absolute top-0 right-0 z-50 cursor-pointer">
                <div
                    className="flex items-center justify-center w-6 h-6 bg-red rounded-bl-lg rounded-tr-lg"
                    onClick={() => handleDelete(i, preview && preview.id)}
                >
                  <WhiteTrashSvg />
                </div>
              </div>
          )}
        </div>
      </div>
  ))
};

function MultiVideoField({
  className,
  labelClassName,
  label,
  name,
  accept,
  required,
  initialValues,
  children,
  submitOnChange
}) {
  const [indexes, setIndexes] = useState([]);
  const [previews, setPreviews] = useState(initialValues || []);

  const { touched, errors, setFieldValue, submitForm } = useFormikContext();
  const error = formErrors.getErrorText(name, label, touched, errors);

  const handleChange = ({ target: { validity, files } }) => {
    if (validity.valid) {
      let uploaded = [];

      Object.keys(files).map(key =>
        uploaded.push({
          id: null,
          url: URL.createObjectURL(files[key])
        })
      );

      setPreviews([
        ...previews,
        ...uploaded,
      ]);

      setIndexes(Object.keys(files));

      setFieldValue(name, files);

      if (submitOnChange) {
        submitForm();
      }
    }
  };

  return (
    <FormGroup
      className={cx(className, "relative")}
      error={!!error}
    >
      <label className={labelClassName} htmlFor={name}>
        {error ? error : label}
      </label>

      <div className="px-2 mb-8">
        <div className="flex flex-wrap items-center -mx-4">

          <DisplayPreviews videos={previews} indexes={indexes} setPreviews={setPreviews} />

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
                required={required}
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
