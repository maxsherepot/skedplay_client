import React from "react";
import cx from "classnames";
import PropTypes from "prop-types";
import { TrashSvg } from "icons";
import { FieldArray, useFormikContext } from 'formik';
import { Button, TextField, PhoneField } from 'UI';
import {useTranslation} from "react-i18next";

const ArrayField = ({ className, name, label, phones }) => {
    const { values } = useFormikContext();
    const {t, i18n} = useTranslation();

    const getField = (name, index) => {
      return phones
        ? (<PhoneField className="flex-1" label="" name={`${name}.${index}`} />)
        : (<TextField className="flex-1" label="" name={`${name}.${index}`} />);
    };

    return (
      <div className={cx(className, "form-group")}>
          <label className="text-grey" htmlFor={name}>{label}</label>
          <FieldArray
              name={name}
              render={arrayHelpers => (
                  <>
                      {values[name] && (
                          values[name].map((item, index) => (
                              <div className="flex items-center px-3" key={index}>
                                  {getField(name, index)}
                                  <button
                                      className="form-group ml-4"
                                      type="button"
                                      onClick={() => arrayHelpers.remove(index)}
                                  >
                                      <TrashSvg />
                                  </button>
                              </div>
                          ))
                      )}
                      <div className="form-group px-3">
                          <Button className="px-6" size="xs" type="button" level="grey" onClick={() => arrayHelpers.push('')}>
                              {t('common.add')}
                          </Button>
                      </div>
                  </>
              )}
          />
      </div>
    )
}

ArrayField.propTypes = {
  className: PropTypes.string,
  phones: PropTypes.bool,
};

export default ArrayField;
