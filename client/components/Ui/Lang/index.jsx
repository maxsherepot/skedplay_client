import PropTypes from "prop-types";
import cx from "classnames";
import {Fragment, useState} from "react";
import React from "react";
import { Dropdown } from "UI";
import {useTranslation} from "react-i18next";
import { i18n } from 'lib/i18n';

function Lang() {
  // const { t, i18n } = useTranslation();
  console.log(i18n, i18n.options.allLanguages);
  return (
    <Dropdown
      transparent={true}
      lang={true}
      trigger={
        (
          <div
            className={cx(
              "flex items-center h-full text-xs",
              "text-white",
              "uppercase"
            )}
          >
            {i18n.language}
          </div>
        )
      }
    >
      {i18n.options.allLanguages.map((lang, index) => (
        <Fragment key={index}>
          <input
            id={'lang_' + lang}
            type="radio"
            value={lang}
            checked={lang === i18n.language}
            name={lang}
            onChange={() => i18n.changeLanguage(lang)}
          />
          <label
            className={cx(
              "block cursor-pointer leading-loose hover:text-red select-none uppercase",
              lang === i18n.language ? "text-red" : "text-black"
            )}
            htmlFor={'lang_' + lang}
          >
            {lang}
          </label>
        </Fragment>
      ))}
    </Dropdown>
  );
}

Lang.propTypes = {
  // children: PropTypes.node,
  // client: PropTypes.object.required
};

export default Lang;
