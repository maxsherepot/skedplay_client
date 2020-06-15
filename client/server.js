const express = require('express');
const next = require('next');
const nextI18NextMiddleware = require('next-i18next/middleware').default;

const nextI18next = require('./lib/i18n');

const port = process.env.PORT || 3000;
const app = next({
  dev: process.env.NODE_ENV !== 'production'
});
const handle = app.getRequestHandler();

(async () => {
  await app.prepare();
  const server = express();

  server.use(nextI18NextMiddleware(nextI18next));

  server.get('/reload-lang', (req, res) => {
    console.log('reload-lang');
    nextI18next.i18n.reloadResources(nextI18next.i18n.options.allLanguages)
      .then((res) => console.log(res))
      .catch((res) => console.log(res));

    return handle(req, res);
  });

  server.get('*', (req, res) => {
    const manySlashes = req.url.includes('//');

    const fakeUrlParams = req.url.includes('[canton]')
      || req.url.includes('[city]')
      || req.url.includes('[id]')
      || req.url.includes('[eid]')
      || req.url.includes('[cid]');

    if (manySlashes || fakeUrlParams) {
      res.statusCode = 404;
      app.render(req, res, '/_error');
      return handle(req, res);
    }

    if (/\..+$/g.test(req.url)) {
      return handle(req, res);
    }

    if (req.url.indexOf('?') === -1) {
      if (!/\/$/g.test(req.url)) {
        return res.redirect(301, req.url + '/');
      }
    } else {
      if (req.url.indexOf('/?') === -1) {
        const askPosition = req.url.indexOf('?');

        let urlArray = req.url.split('');
        urlArray.splice(askPosition, 0, '/');

        return res.redirect(301, urlArray.join(''));
      }

      req.url = req.url.replace('/?', "?");
    }

    req.url = req.url.replace(/\/$/, "");
    if (req.url === "") {
      req.url = "/"
    }

    return handle(req, res);
  });

  await server.listen(port);
  console.log(`> Ready on http://localhost:${port}`); // eslint-disable-line no-console
})();