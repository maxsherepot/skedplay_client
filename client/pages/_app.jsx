import React from 'react'
import App from "next/app";
import { ApolloProvider } from "@apollo/react-hooks";
import withApollo from "lib/withApollo";
import {MainLayout} from 'layouts'
import "styles/style.scss";
import { appWithTranslation } from 'lib/i18n';
import slug from 'slug';
import {useRouter} from "next/router";
import {useTranslation} from "react-i18next";
import { NextSeo } from 'next-seo';
import TagManager from "react-gtm-module";
import {YMInitializer} from "react-yandex-metrika";

slug.defaults.mode = 'rfc3986';

const LangTags = () => {
  const {asPath} = useRouter();
  const {i18n} = useTranslation();

  const tags = i18n.options.allLanguages.map(lang => {
    let path = asPath;

    for (let i in i18n.options.otherLanguages) {
      path = path.replace(`${i18n.options.otherLanguages[i]}/`, '/');
    }

    if (lang === 'de' && path === '/') {
      path = '';
    }

    return {
      hrefLang: lang,
      href: `${process.env.APP_URL}${lang === 'de' ? '' : `/${lang}`}${path}`
    };
  });

  return (
    <NextSeo
      languageAlternates={tags}
    />
  );
};

const Analytics = () => {
  if (typeof document === 'undefined' || process.env.ANALYTICS_SCRIPTS !== 'true') {
    return null;
  }

  return (
    <YMInitializer
      accounts={[62055295]}
      options={{
        clickmap:true,
        trackLinks:true,
        accurateTrackBounce:true,
        webvisor:true
      }}
    />
  );
};

class MyApp extends App {
  static displayName = "MyApp";

  render() {
    const { Component, pageProps, apolloClient } = this.props;

    const getLayout =
        Component.getLayout || (page => <MainLayout {...pageProps} children={page} />)

      return (
        <ApolloProvider client={apolloClient}>
          <LangTags/>

          {getLayout(<Component {...pageProps} />, pageProps)}

          <Analytics/>
        </ApolloProvider>
      )
  }
}

export default withApollo(appWithTranslation(MyApp));
