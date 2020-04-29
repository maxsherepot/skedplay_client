import React from 'react'
import App from "next/app";
import { ApolloProvider } from "@apollo/react-hooks";
import withApollo from "lib/withApollo";
import {MainLayout} from 'layouts'
import "styles/style.scss";
import { appWithTranslation } from 'lib/i18n';
import {LoadScriptNext} from "@react-google-maps/api";
import { Loader } from "UI";
import { withSSR } from 'react-i18next';

class MyApp extends App {
  static displayName = "MyApp";

  render() {
    const { Component, pageProps, apolloClient } = this.props;

    const getLayout =
        Component.getLayout || (page => <MainLayout {...pageProps} children={page} />)

    if (typeof document === 'undefined') {
      return (
        <ApolloProvider client={apolloClient}>
          {getLayout(<Component {...pageProps} />, pageProps)}
        </ApolloProvider>
      )
    }

    return (
        <ApolloProvider client={apolloClient}>
          <LoadScriptNext
            id="script-loader"
            googleMapsApiKey={process.env.GOOGLE_MAP_KEY}
            libraries={['places']}
            loadingElement={<div/>}
          >
            {getLayout(<Component {...pageProps} />, pageProps)}
          </LoadScriptNext>
        </ApolloProvider>
    )
  }
}

export default withApollo(appWithTranslation(MyApp));
