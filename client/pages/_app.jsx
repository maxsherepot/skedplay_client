import React from 'react'
import App from "next/app";
import { ApolloProvider } from "@apollo/react-hooks";
import withApollo from "lib/withApollo";
import {MainLayout} from 'layouts'
import "styles/style.scss";

class MyApp extends App {
  static displayName = "MyApp";

  render() {
    const { Component, pageProps, apolloClient } = this.props;

    const getLayout =
        Component.getLayout || (page => <MainLayout {...pageProps} children={page} />)

    return (
        <ApolloProvider client={apolloClient}>
          {getLayout(<Component {...pageProps} />, pageProps)}
        </ApolloProvider>
    )
  }
}

export default withApollo(MyApp);
