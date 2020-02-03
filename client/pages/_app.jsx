import React from 'react'
import App from "next/app";
import { ApolloProvider } from "@apollo/react-hooks";
import withApollo from "lib/withApollo";
import {MainLayout} from 'layouts'
import "styles/style.scss";
import { appWithTranslation } from 'lib/i18n';
import {LoadScript} from "@react-google-maps/api";

class MyApp extends App {
  static displayName = "MyApp";

  render() {
    const { Component, pageProps, apolloClient } = this.props;

    const getLayout =
        Component.getLayout || (page => <MainLayout {...pageProps} children={page} />)

    return (
        <ApolloProvider client={apolloClient}>
          <LoadScript
            id="script-loader"
            googleMapsApiKey={process.env.GOOGLE_MAP_KEY}
            libraries={['places']}
          >
            {getLayout(<Component {...pageProps} />, pageProps)}
          </LoadScript>
        </ApolloProvider>
    )
  }
}

export default withApollo(appWithTranslation(MyApp));
