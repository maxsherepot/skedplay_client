import NextI18Next from 'next-i18next';
import Backend from 'i18next-xhr-backend';
import axios from 'axios';
import isNode from 'detect-node';
const request = require('sync-request');

if (isNode) {
  eval("require('dotenv').config()");
}

// const languages = JSON.parse(request('GET', process.env.API_URL + '/api/languages').getBody());
const languages = ['de', 'fr'];

const NextI18NextInstance = new NextI18Next({
  // use: [
  //   Backend
  // ],
  defaultLanguage: 'en',
  fallbackLng: 'en',
  otherLanguages: languages,
  defaultNS: 'translation',
  // backend: {
  //   ajax: function (url, options, callback, data) {
  //     return axios.get(url, data).then(res => callback(res.data, res));
  //   },
  //   loadPath: process.env.API_URL + '/api/{{ns}}/{{lng}}',
  //   parse: function(data) {
  //     return data;
  //   },
  // },
});

export default NextI18NextInstance;

export const {
  config,
  i18n,
  appWithTranslation,
  withTranslation,
} = NextI18NextInstance;