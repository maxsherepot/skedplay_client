import React, { useState } from "react";

import { SelectField, TextField } from "UI";
import { FieldArray, useFormikContext } from "formik";
import { RatingSvg, TrashSvg } from "icons";
import {useTranslation} from "react-i18next";
import AddSvg from "components/icons/AddSvg";
import dot from "dot-object";

const LangSelector = () => {
  const { values, setFieldValue } = useFormikContext();
  const {t, i18n} = useTranslation();

  const languages = i18n.options.allLanguages.map(lang => {
    return {
      label: t('language.' + lang),
      value: lang
    };
  });

  const RatingField = ({ name }) => {
    const { values, setFieldValue } = useFormikContext();
    const value = dot.pick(name, values) || values[name] || 1;

    const setStars = (stars) => {
      setFieldValue(name, stars);
    };

    let stars = [];

    for (let i = 0; i < 3; i++) {
      stars[i] = (
        <div
          key={i}
          className="cursor-pointer mr-2"
          onClick={() => setStars(+i + 1)}
        >
          <RatingSvg
            width={29}
            height={27}
            checked={i < value}
          />
        </div>
      );
    }

    return (
      <div className="flex flex-wrap w-full md:w-2/6 px-2 mb-4">
        {stars}
        <input type="hidden" name={name} value={value}/>
      </div>
    );
  };

  const FieldControl = ({ arrayHelpers, index }) => (
    <div
      className="flex flex-wrap w-full md:w-2/6 px-2 mb-4 cursor-pointer"
      onClick={() => deleteRow(arrayHelpers, index)}
    >
      <TrashSvg />
      <div className="ml-2">{t('ad.delete_language')}</div>
    </div>
  );

  const deleteRow = (arrayHelpers, index) => {
    arrayHelpers.remove(index);
    let valuesLanguages = [...values.languages];
    valuesLanguages.splice(index, 1);

    setFieldValue('languages', valuesLanguages);
  };

  const addLanguage = (arrayHelpers) => {
    setFieldValue('languages', [...values.languages, {language: '', stars: 0}]);
    arrayHelpers.push("");
  };

  const checkLang = (id) => {
    return id > 2;
  };

  return (
    <div className="flex flex-wrap items-center -mx-4">
      <label className="text-grey ml-2 mb-3">Language</label>
      <FieldArray
        name="language"
        render={arrayHelpers => (
          <div className="w-full">
            {(values.languages || []).map((language, index) => (
              <div className="flex flex-wrap items-center w-full" key={index}>
                <SelectField
                  className="w-full sm:w-1/3 px-2"
                  label=""
                  placeholder=""
                  name={`languages.${index}.code`}
                  options={languages.every(checkLang)}
                />

                <RatingField name={`languages.${index}.stars`}/>

                <FieldControl arrayHelpers={arrayHelpers} index={index}/>
              </div>
            ))}

            <div
              className="w-full flex items-center sm:w-1/3 px-2 cursor-pointer"
              onClick={() => addLanguage(arrayHelpers)}
            >
              <AddSvg /> <div className="ml-2">Add language</div>
            </div>
          </div>
        )}
      />
    </div>
  );
};

export default LangSelector;
