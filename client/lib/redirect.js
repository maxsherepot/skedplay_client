// import Router from 'next/router'
import { Router } from 'lib/i18n';

export default (context, target) => {
  if (context && context.res) {
    context.res.writeHead(303, { Location: target });
    context.res.end();
  } else {
    Router.replace(target);
  }
};
