import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import { Field, useFormikContext } from "formik";
import { CloseSvg, AddPhotoSvg } from "icons";

import { FormGroup } from "UI";
import formErrors from "services/formErrors";
import {useTranslation} from "react-i18next";

function FileField({ className, labelClassName, preview, label, name, secondLabel, ...inputProps }) {
  const [filePreview, setFilePreview] = useState(null);
  const { touched, errors, setFieldValue } = useFormikContext();
  const error = formErrors.getErrorText(name, label, touched, errors);
  const {t, i18n} = useTranslation();

  useEffect(() => {
    if (preview) {
      setFilePreview(preview)
    }
  }, [preview, setFilePreview]);

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
      error={!!error}
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
                <div className="ml-2">{t('index.delete_attachment')}</div>
              </div>
            </div>
          ) : (
            <div className="border border-light-grey border-dashed rounded-lg py-7">
              <div className="flex flex-col items-center">
                <AddPhotoSvg />
                <span className="mt-4 font-medium text-lg">{secondLabel ? secondLabel : `${t('index.add_logo')}`}</span>
              </div>
              <input
                className="absolute inset-0 opacity-0 w-full"
                type="file"
                {...inputProps}
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
