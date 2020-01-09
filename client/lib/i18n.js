import NextI18Next from 'next-i18next'

const NextI18NextInstance = new NextI18Next({
  defaultLanguage: 'en',
  fallbackLng: 'en',
  otherLanguages: ['ch'],
  defaultNS: 'translation',
});

export default NextI18NextInstance;

export const {
  config,
  i18n,
  appWithTranslation,
  withTranslation,
} = NextI18NextInstance;