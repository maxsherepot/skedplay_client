import React, { useState } from "react";

import { SelectField } from "UI";
import { FieldArray, useFormikContext } from "formik";
import { RatingSvg, TrashSvg } from "icons";

const LangSelector = () => {
  const [langs, setlangs] = useState([
    {
      ratings: 2
    },
    {
      ratings: 3
    }
  ]);

  const { values } = useFormikContext();

  const languages = [
    {
      label: "English",
      value: "english"
    },
    {
      label: "Russian",
      value: "russian"
    }
  ];

  const RatingField = ({ ratings }) => {
    let stars = [];

    for (let i = 0; i < 3; i++) {
      stars[i] = (
        <RatingSvg
          key={i}
          width={20}
          height={20}
          checked={i < ratings}
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
      <div className="ml-2">Delete language</div>
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
          <div className="w-full sm:w-1/3 px-2">
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
                  {/* <button
                    type="button"
                    onClick={() => arrayHelpers.remove(index)}
                  >
                    -
                  </button>
                  <button
                    type="button"
                    onClick={() => arrayHelpers.insert(index, "")}
                  >
                    +
                  </button> */}
                </div>
              ))
            ) : (
                <button type="button" onClick={() => arrayHelpers.push("")}>
                  {/* show this when user has removed all language from the list */}
                  Add a friend
              </button>
              )}
            <div>
              <button type="submit">Submit</button>
            </div>
          </div>
        )}
      />

      {/* <div
        className="w-full flex items-center sm:w-1/3 px-2 cursor-pointer"
        onClick={() => setlangs([...langs, { ratings: 0 }])}
      >
        <AddSvg /> <div className="ml-2">Add language</div>
      </div> */}
    </div>
  );
};

export default LangSelector;
