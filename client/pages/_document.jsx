import Document, { Html, Head, Main, NextScript } from "next/document";
import Script from "lib/Script";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head />
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
        </body>
      </Html>
    );
  }
}

export default MyDocument;