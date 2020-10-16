import Document, { Html, Head, Main, NextScript } from "next/document";
import Script from "lib/Script";
import React from "react";

class MyDocument extends Document {
  // static async getInitialProps(ctx) {
  //   //   const initialProps = await Document.getInitialProps(ctx);
  //   //   return { ...initialProps };
  //   // }

  render() {
    return (
      <Html>
        <Head>
          <link rel="icon" href="/static/favicon.ico" />
        </Head>
        <body className="font-body bg-xs-grey">
          <Main />
          <NextScript />
          {/* <Script>
            {() => {
              window.markerConfig = {
                destination: '5f67532a3206c724fba9af59',
              };

              !function (e, r, t) {
                if (e.__Marker) return;
                e.__Marker = {};
                var n = r.createElement("script");
                n.async = 1, n.src = "https://edge.marker.io/latest/shim.js";
                var s = r.getElementsByTagName("script")[0];
                s.parentNode.insertBefore(n, s)
              }(window, document);
            }}
          </Script> */}

          {process.env.ANALYTICS_SCRIPTS === 'true' &&
            <>
              <script async src="https://www.googletagmanager.com/gtag/js?id=UA-163899983-1"/>
              <Script>
                {() => {
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());

                  gtag('config', 'UA-163899983-1');
                }}
              </Script>
            </>
          }
        </body>
      </Html>
    );
  }
}

export default MyDocument;