import React, { useState } from "react";

import { SelectField } from "UI";
import { FieldArray, useFormikContext } from "formik";
import { ratingvg, TrashSvg } from "icons";
import {useTranslation} from "react-i18next";
import AddSvg from "components/icons/AddSvg";
import {i18n} from "lib/i18n";

const LangSelector = () => {
  const [langs, setlangs] = useState([
    {
      rating: 2
    },
    {
      rating: 3
    }
  ]);

  const { values } = useFormikContext();
  const {t, i18n} = useTranslation();

  const languages = i18n.options.allLanguages.map(lang => {
    return {
      label: t('language.' + lang),
      value: lang
    };
  });

  const RatingField = ({ rating }) => {
    let stars = [];

    for (let i = 0; i < 3; i++) {
      stars[i] = (
        <ratingvg
          key={i}
          width={20}
          height={20}
          checked={i < rating}
          className={i % 2 === 0 ? "" : "mx-3"}
        />
      );
    }

    return (
      <div className="flex flex-wrap w-full md:w-1/6 px-2 mb-4">{stars}</div>
    );
  };

  const FieldControl = ({ index }) => (
    <div
      className="flex flex-wrap w-full md:w-2/6 px-2 mb-4 cursor-pointer"
      onClick={() => deleteRow(index)}
    >
      <TrashSvg />
      <div className="ml-2">{t('ad.delete_language')}</div>
    </div>
  );

  const deleteRow = index => {
    langs.splice(index, 1);
    setlangs([...langs]);
  };

  console.log(langs);

  return (
    <div className="flex flex-wrap items-center -mx-4">
      {/* <label className="text-grey ml-2">Language</label> */}
      <FieldArray
        name="language"
        render={arrayHelpers => (
          <div className="w-full px-2">
            {values.language && values.language.length > 0 ? (
              values.language.map((friend, index) => (
                <div className="flex flex-wrap items-center w-full" key={index}>
                  <SelectField
                    className="w-full sm:w-1/3 px-2"
                    label=""
                    placeholder=""
                    name={`language.${index}`}
                    options={languages}
                  />
                  {/*<button*/}
                  {/*  type="button"*/}
                  {/*  onClick={() => arrayHelpers.remove(index)}*/}
                  {/*>*/}
                  {/*  -*/}
                  {/*</button>*/}
                  {/*<button*/}
                  {/*  type="button"*/}
                  {/*  onClick={() => arrayHelpers.insert(index, "")}*/}
                  {/*>*/}
                  {/*  +*/}
                  {/*</button>*/}

                  <RatingField rating={2}/>

                  <FieldControl index={index}/>
                </div>
              ))
            ) : (
                <button type="button" onClick={() => arrayHelpers.push("")}>
                  {/* show this when user has removed all language from the list */}
                  {t('ad.add_friend')}
              </button>
              )}
            {/*<div>*/}
            {/*  <button type="submit">{t('common.submit')}</button>*/}
            {/*</div>*/}
          </div>
        )}
      />

      <div
        className="w-full flex items-center sm:w-1/3 px-2 cursor-pointer"
        onClick={() => setlangs([...langs, { rating: 0 }])}
      >
        <AddSvg /> <div className="ml-2">Add language</div>
      </div>
    </div>
  );
};

export default LangSelector;
