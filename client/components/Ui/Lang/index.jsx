import PropTypes from "prop-types";
import cx from "classnames";
import { Fragment, useState } from "react";
import React from "react";
import { Dropdown } from "UI";
import { i18n } from 'lib/i18n';
import { useRouter } from "next/router";

function Lang({ mobile, black, className }) {
  const { asPath } = useRouter();

  const getLangUrl = (lang) => {
    let path = asPath;

    for (let i in i18n.options.otherLanguages) {
      path = path.replace(`${i18n.options.otherLanguages[i]}/`, '/');
    }

    if (lang === 'de' && path === '/') {
      path = '';
    }

    return `${process.env.APP_URL}${lang === 'de' ? '' : `/${lang}`}${path}`;
  };

  if (mobile) {
    return (
      <div className="locales">
        <a
          href={getLangUrl("de")}
          className={cx([
            "de" === i18n.language ? "active" : "",])}
          onClick={e => { e.preventDefault(); i18n.changeLanguage("de") }}
        > de </a>

        <a
          href={getLangUrl("fr")}
          className={cx([
            "fr" === i18n.language ? "active" : "",])}
          onClick={e => { e.preventDefault(); i18n.changeLanguage("fr") }}
        > fr </a>
        
        <a
          href={getLangUrl("en")}
          className={cx([
            "en" === i18n.language ? "active" : "",])}
          onClick={e => { e.preventDefault(); i18n.changeLanguage("en") }}
        > en </a>
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
              "flex items-center h-full text-xs hover:cursor-pointer",
              !black ? "text-white" : "text-black",
              "uppercase",
              className
            )}
          >
            {i18n.language}
          </div>
        )
      }
    >
      {({ close }) => (
        <>
          {i18n.options.allLanguages.reverse().map((lang, index) => (
            <a
              key={index}
              href={getLangUrl(lang)}
              onClick={e => {
                e.preventDefault();
                close();
                i18n.changeLanguage(lang);
              }}
            >
              <input
                id={'lang_' + lang}
                type="radio"
                value={lang}
                checked={lang === i18n.language}
                name={lang}
                onChange={() => {
                  close();
                  i18n.changeLanguage(lang);
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
            </a>
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
