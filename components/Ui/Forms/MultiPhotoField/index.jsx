import React, { useState } from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import { useFormikContext } from "formik";
import { FormGroup, CheckboxField, DeletePopup } from "UI";
import { WhiteTrashSvg, TrashSvg } from "icons";
import { DELETE_MEDIA, CLEAR_MEDIA_COLLECTION } from "queries";
import { useMutation } from "@apollo/react-hooks";
import formErrors from "services/formErrors";
import {useTranslation} from "react-i18next";

const DisplayPreviews = ({ photos, setPreviews, mainImageIndex, setMainImageIndex, selectable, submitOnChange, refetchEntity }) => {
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
      }).then(() => {
        if (refetchEntity) {
          refetchEntity();
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
                  className="relative sm:w-full w-1/2 md:w-38 rounded-lg px-2 mb-6"
                  key={i}
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered(null)}
              >
                <div className="relative">
                  <img
                      className="rounded-lg object-cover h-56 sm:h-photo-sm md:h-e-photo-md lg:h-e-photo-lg hd:h-e-photo-hd"
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
  children,
  submitOnChange,
  trigger,
  refetchEntity,
  modelId,
  modelType,
  mediaCollection,
}) {
  const {t, i18n} = useTranslation();
  const [previews, setPreviews] = useState(initialValues || []);
  const [indexes, setIndexes] = useState([]);
  const [clearMediaCollection] = useMutation(CLEAR_MEDIA_COLLECTION);

  const mainImageIndexInit = (initialValues || []).findIndex(photo => {
    const properties = JSON.parse(photo.custom_properties || '{}');

    if (properties && properties.main_image) {
      return true;
    }

    return false;
  });

  const initIndex = mainImageIndexInit === -1 ? null : mainImageIndexInit;

  const [mainImageIndex, setMainImageIndex] = useState(initIndex);

  const { touched, errors, setFieldValue, submitForm, resetForm } = useFormikContext();
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

      if (submitOnChange) {
        submitForm().then(() => {
          resetForm();

          if (refetchEntity) {
            refetchEntity();
          }
        });
      }
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

    setFieldValue('custom_properties', customProperties);

    if (submitOnChange) {
      submitForm().then(() => resetForm());
    }
  };

  const handleDeleteAll = () => {
    clearMediaCollection({
      variables: {
        collection_name: mediaCollection,
        model_type: modelType,
        model_id: parseInt(modelId),
      }
    }).then(() => {
      if (refetchEntity) {
        refetchEntity();
      }
      setPreviews([]);
      setMainImageIndex(null);
    });
  };

  return (
    <>
      <div className="flex justify-between">
        <div className="flex flex-col md:flex-row md:items-end mb-5">
          <div className="text-xl sm:text-2xl font-bold leading-none">{t('clubs.photos')}</div>
          <span className="md:ml-6 text-xs md:text-lg">
              {t('max_size_uploaded.photos')}
            </span>
        </div>

        {previews.length > 0 &&
          <DeletePopup
            onEnter={handleDeleteAll}
            title={`${t('act.delete_all')} ${t('account.photos')}?`}
            deleteButton={
              <div className="flex items-center mx-4 sm:mx-0 mb-5 cursor-pointer">
                <TrashSvg/>
                <span className="hidden sm:block font-bold ml-3">
                    {t('act.delete_all')}
                  </span>
              </div>
            }
          >
            <div className="pt-6">
              <p>{t('questions.sure_to_delete_all_photos')}</p>
            </div>
          </DeletePopup>
        }
      </div>

      <div className="flex flex-wrap">
        <FormGroup
          className={cx(className, "relative")}
          error={!!error}
        >
          <label className={labelClassName} htmlFor={name}>
            {error ? error : label}
          </label>

          <>
            <DisplayPreviews
              mainImageIndex={mainImageIndex}
              setMainImageIndex={setMainImages}
              photos={previews}
              setPreviews={setPreviews}
              indexes={indexes}
              selectable={selectable}
              refetchEntity={refetchEntity}
            />

            <label className="relative" style={{ paddingLeft: 0 }}>
              {trigger}
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
      </div>
    </>
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
