import NextI18Next from 'next-i18next';
import Backend from 'i18next-xhr-backend';
import axios from 'axios';
import isNode from 'detect-node';
const request = require('sync-request');

let apiUrl;

if (isNode) {
  eval("require('dotenv').config()");

  apiUrl = process.env.API_URL_INTERNAL;
} else {
  apiUrl = process.env.API_URL;
}

console.log(apiUrl);

let languages, backend, use = [];

if (process.env.LANG_FROM_BACKEND === 'true') {
  try {
    languages = JSON.parse(request('GET', apiUrl + '/api/languages').getBody());
  } catch (e) {
    console.error(e);
    languages = ['en', 'fr'];
  }
  backend = {
    ajax: function (url, options, callback, data) {
      return axios.get(url, data).then(res => callback(res.data, res));
    },
    loadPath: apiUrl + '/api/{{ns}}/{{lng}}',
    parse: function(data) {
      return data;
    },
  };
  use.push(Backend);
} else {
  languages = ['en', 'fr'];
}

const NextI18NextInstance = new NextI18Next({
  use: use,
  defaultLanguage: 'de',
  fallbackLng: 'en',
  otherLanguages: languages,
  defaultNS: 'translation',
  backend: backend,
  localeSubpaths: {
    // de: 'de',
    en: 'en',
    fr: 'fr',
  }
});

export default NextI18NextInstance;

export const {
  config,
  i18n,
  appWithTranslation,
  Link,
  Router,
  withTranslation,
} = NextI18NextInstance;