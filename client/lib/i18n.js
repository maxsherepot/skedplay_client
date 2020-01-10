import NextI18Next from 'next-i18next';
import Backend from 'i18next-xhr-backend';
import axios from 'axios';
import isNode from 'detect-node';
const request = require('sync-request');

if (isNode) {
  eval("require('dotenv').config()");
}

let languages, backend, use = [];

if (process.env.LANG_FROM_BACKEND) {
  languages = JSON.parse(request('GET', process.env.API_URL + '/api/languages').getBody());
  backend = {
    ajax: function (url, options, callback, data) {
      return axios.get(url, data).then(res => callback(res.data, res));
    },
    loadPath: process.env.API_URL + '/api/{{ns}}/{{lng}}',
    parse: function(data) {
      return data;
    },
  };
  use.push(Backend);
} else {
  languages = ['de', 'fr'];
}

const NextI18NextInstance = new NextI18Next({
  use: use,
  defaultLanguage: 'en',
  fallbackLng: 'en',
  otherLanguages: languages,
  defaultNS: 'translation',
  backend: backend,
});

export default NextI18NextInstance;

export const {
  config,
  i18n,
  appWithTranslation,
  withTranslation,
} = NextI18NextInstance;