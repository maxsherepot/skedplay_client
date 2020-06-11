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

              <Script>
                {() => {
                  (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
                    m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
                  (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

                  ym(62055295, "init", {
                    clickmap:true,
                    trackLinks:true,
                    accurateTrackBounce:true,
                    webvisor:true
                  });
                }}
              </Script>
              <noscript><div><img src="https://mc.yandex.ru/watch/62055295" style={{position: "absolute", left: "-9999px"}} alt="" /></div></noscript>
            </>
          }
        </body>
      </Html>
    );
  }
}

export default MyDocument;