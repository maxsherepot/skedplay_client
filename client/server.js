const express = require('express');
// const axios = require('axios');
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
    nextI18next.i18n.reloadResources(nextI18next.i18n.options.allLanguages);

    return handle(req, res)
  });

  server.get('*', (req, res) => handle(req, res));

  await server.listen(port)
  console.log(`> Ready on http://localhost:${port}`); // eslint-disable-line no-console
})()