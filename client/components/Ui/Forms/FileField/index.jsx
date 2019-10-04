import React, { useState } from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import { Field, useFormikContext } from "formik";
import { CloseSvg, AddPhotoSvg } from "icons";

import { FormGroup } from "UI";

function FileField({ className, labelClassName, label, name }) {
  const [filePreview, setFilePreview] = useState(null);
  const { touched, errors, setFieldValue } = useFormikContext();
  const error = touched[name] && errors[name] ? errors[name] : null;

  const handleChange = async ({ target: { validity, files } }) => {
    if (validity.valid) {
      const [file] = files;
      setFilePreview(URL.createObjectURL(file));
      setFieldValue(name, file);
    }
  };

  return (
    <FormGroup
      className={cx(className, "relative")}
      error={error ? true : false}
    >
      <label className={labelClassName} htmlFor={name}>
        {error ? error : label}
      </label>

      <Field name={name}>
        {() =>
          filePreview ? (
            <div className="flex flex-col items-center justify-center">
              <img className="h-36 w-full object-contain" src={filePreview} />
              <div
                className="flex items-center cursor-pointer mt-4"
                onClick={() => setFilePreview(null)}
              >
                <CloseSvg width={14} height={14} />
                <div className="ml-2">Delete attachment</div>
              </div>
            </div>
          ) : (
            <div className="border border-light-grey border-dashed rounded-lg py-7">
              <div className="flex flex-col items-center">
                <AddPhotoSvg />
                <span className="mt-4 font-medium text-lg">Add logo</span>
              </div>
              <input
                className="absolute inset-0 opacity-0 w-full"
                type="file"
                required
                onChange={handleChange}
              />
            </div>
          )
        }
      </Field>
    </FormGroup>
  );
}

FileField.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
};

export default FileField;
