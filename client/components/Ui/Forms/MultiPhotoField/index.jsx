import React, { useState } from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import { useFormikContext } from "formik";
import { FormGroup, CheckboxField } from "UI";
import { WhiteTrashSvg } from "icons";
import { DELETE_MEDIA } from "queries";
import { useMutation } from "@apollo/react-hooks";
import formErrors from "services/formErrors";
import {useTranslation} from "react-i18next";

const DisplayPreviews = ({ photos, setPreviews, mainImageIndex, setMainImageIndex, selectable }) => {
  const [deleteMedia] = useMutation(DELETE_MEDIA);
  const {t, i18n} = useTranslation();
  const [hovered, setHovered] = useState(null);

  const handleMainImageIndex = (checked, index) => {
    const i = checked ? index : null;

    if (setMainImageIndex) {
      setMainImageIndex(i);
    }
  };

  const handleDelete = (i, id) => {
    if (id) {
      deleteMedia({
        variables: {
          id
        }
      })
    }

    photos.splice(i, 1);
    setPreviews([...photos]);
  };

  return (
      <div className="px-2 mb-8">
        <div className="flex flex-wrap items-center -mx-4">
          {photos.map((photo, i) => (
              <div
                  className="relative w-full md:w-38 rounded-lg px-2 mb-6"
                  key={i}
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered(null)}
              >
                <div className="relative">
                  <img
                      className="rounded-lg object-cover h-photo sm:h-photo-sm md:h-e-photo-md lg:h-e-photo-lg hd:h-e-photo-hd"
                      src={photo && photo.thumb_url}
                  />

                  {hovered === i && (
                      <div className="absolute top-0 right-0 z-40 cursor-pointer">
                        <div
                            className="flex items-center justify-center w-6 h-6 bg-red rounded-bl-lg rounded-tr-lg"
                            onClick={() => handleDelete(i, photo && photo.id)}
                        >
                          <WhiteTrashSvg />
                        </div>
                      </div>
                  )}
                </div>

                {selectable && (
                    <div className="absolute inset-0 flex items-end">
                      <CheckboxField
                          className="text-white"
                          label={t('index.main_photo')}
                          name={'custom_properties.' + i + '.main_image'}
                          checkedOnlyByProp={true}
                          checked={mainImageIndex === i}
                          onChange={checked => handleMainImageIndex(checked, i)}
                      />
                    </div>
                )}
              </div>
          ))}
        </div>
      </div>
  )
};

function MultiPhotoField({
  className,
  labelClassName,
  label,
  name,
  accept,
  required,
  initialValues,
  selectable,
  children
}) {
  const [previews, setPreviews] = useState(initialValues || []);
  const [indexes, setIndexes] = useState([]);

  const mainImageIndexInit = initialValues.findIndex(photo => {
    const properties = JSON.parse(photo.custom_properties || '{}');

    if (properties && properties.main_image) {
      return true;
    }

    return false;
  });

  const initIndex = mainImageIndexInit === -1 ? null : mainImageIndexInit;

  const [mainImageIndex, setMainImageIndex] = useState(initIndex);

  const { touched, errors, setFieldValue } = useFormikContext();
  const error = formErrors.getErrorText(name, label, touched, errors);

  const handleChange = ({ target: { validity, files } }) => {
    if (validity.valid) {
      let uploaded = [];

      Object.keys(files).map(key =>
        uploaded.push({
          id: null,
          thumb_url: URL.createObjectURL(files[key]),
        })
      );

      setPreviews([
          ...previews,
          ...uploaded,
      ]);
      setIndexes(Object.keys(files));

      setFieldValue(name, files);
    }
  };

  const setMainImages = (index) => {
    setMainImageIndex(index);

    let customProperties = [];

    for (let i in previews) {
      if (parseInt(i) === index) {
        customProperties.push({main_image: true});
      } else {
        customProperties.push({main_image: false});
      }
    }

    console.log(index, customProperties);

    setFieldValue('custom_properties', customProperties);
  };

  return (
    <FormGroup
      className={cx(className, "relative")}
      error={!!error}
    >
      <label className={labelClassName} htmlFor={name}>
        {error ? error : label}
      </label>

      <>
        <DisplayPreviews mainImageIndex={mainImageIndex} setMainImageIndex={setMainImages} photos={previews} setPreviews={setPreviews} indexes={indexes} selectable={selectable} />

        <label className="relative" style={{ paddingLeft: 0 }}>
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
  accept: "image/*",
  selectable: true,
};

export default MultiPhotoField;
