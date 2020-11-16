import React, {useState} from "react";
import {SelectField} from "UI";
import {FieldArray, useFormikContext} from "formik";
import {RatingSvg, TrashSvg} from "icons";
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

  const [availableLang, setAvailableLang] = useState([]);

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
            <span className="xss:hidden block sm:hidden">
                <RatingSvg
                  width={22}
                  height={20}
                  checked={i < value}
                />
            </span>
            <span className="hidden sm:block">
                <RatingSvg
                  width={29}
                  height={27}
                  checked={i < value}
                />
            </span>
        </div>
      );
    }

    return (
      <div className="flex flex-wrap w-full px-2 mb-4">
        {stars}
        <input type="hidden" name={name} value={value}/>
      </div>
    );
  };

  const FieldControl = ({ arrayHelpers, index }) => (
    <div
      className="flex flex-wrap w-full  sm:px-2 mb-4 cursor-pointer"
      onClick={() => deleteRow(arrayHelpers, index)}
    >
      <TrashSvg />
      <div className="ml-2 hidden sm:block">{t('ad.delete_language')}</div>
    </div>
  );

  const deleteRow = (arrayHelpers, index) => {
    const lang = values.languages[index];
    arrayHelpers.remove(index);

    let valuesLanguages = [...values.languages];
    valuesLanguages.splice(index, 1);

    setFieldValue('languages', valuesLanguages);

    if (lang) {
      const availableLangNew = [...availableLang].filter(foundLang => foundLang.code !== lang.code);
      setAvailableLang(availableLangNew);
    }
  };

  const addLanguage = (arrayHelpers) => {
    setFieldValue('languages', [...values.languages, {language: '', stars: 1}]);
    arrayHelpers.push("");
  };

  const setChangeField = (lang, index, code) => {
    let availableLangNew = [...availableLang];

    availableLangNew[index] = {
      ...lang,
      code
    };

    setAvailableLang(availableLangNew);
  };

  const langList = (selectLangCode) => {
    const chosenLanguages = availableLang.map(chosenLang => chosenLang.code);

    return [...languages].filter(lang => !chosenLanguages.includes(lang.value) || lang.value === selectLangCode);
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
                  className="w-3/6 sm:w-1/3 px-2"
                  label=""
                  placeholder=""
                  onSelect={e => setChangeField(language, index, e)}
                  name={`languages.${index}.code`}
                  options={langList(language.code)}
                />

            <div className="w-5/12 sm:w-auto">
                    <RatingField name={`languages.${index}.stars`}/>
                </div>
                <div className="w-1/12 sm:w-auto">
                    <FieldControl  arrayHelpers={arrayHelpers} index={index}/>
                </div>
              </div>
            ))}

            <div
              className="w-full flex items-center sm:w-1/3 px-2 cursor-pointer"
              onClick={() => addLanguage(arrayHelpers)}
            >
              <AddSvg /> <div className="ml-2">{t('ad.add_language')}</div>
            </div>
          </div>
        )}
      />
    </div>
  );
};

export default LangSelector;
