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
          <Script>
            {() => {
              (function (d, t) {
                var bh = d.createElement(t),
                  s = d.getElementsByTagName(t)[0];
                bh.type = "text/javascript";
                bh.src = `https://www.bugherd.com/sidebarv2.js?apikey=${process.env.BUGHERD_API_KEY}`;
                s.parentNode.insertBefore(bh, s);
              })(document, "script");
            }}
          </Script>

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