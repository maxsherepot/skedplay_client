import PropTypes from "prop-types";
import cx from "classnames";
import {Fragment, useState} from "react";
import React from "react";
import { Dropdown } from "UI";
import { i18n } from 'lib/i18n';

function Lang({ mobile, black, className }) {
  if (mobile) {
    return (
      <div className="locales">
        {i18n.options.allLanguages.reverse().map((lang, index) => (
          <a
            href="#"
            className={cx([
              lang === i18n.language ? "active" : "",
            ])}
            key={index}
            onClick={e => {e.preventDefault(); i18n.changeLanguage(lang)}}
          >
            {lang}
          </a>
        ))}
      </div>
    );
  }

  return (
    <Dropdown
      transparent={true}
      lang={true}
      trigger={
        (
          <div
            className={cx(
              "flex items-center h-full text-xs lang-text hover:cursor-pointer",
              !black ? "" : "text-white-important",
              "uppercase",
              className
            )}
          >
            {i18n.language}
          </div>
        )
      }
    >
      {({close}) => (
        <>
          {i18n.options.allLanguages.reverse().map((lang, index) => (
            <Fragment key={index}>
              <input
                id={'lang_' + lang}
                type="radio"
                value={lang}
                checked={lang === i18n.language}
                name={lang}
                onChange={() => {
                  close();
                  i18n.changeLanguage(lang)
                }}
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
        </>
      )}
    </Dropdown>
  );
}

Lang.propTypes = {
  // children: PropTypes.node,
  // mobile: PropTypes.boolean
};

export default Lang;
