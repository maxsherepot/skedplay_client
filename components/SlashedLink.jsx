import { Link } from 'lib/i18n';

export default ({as, href, ...rest}) => {
  if (as && !/\/$/g.test(as)) {
    as += '/';
  }

  if (typeof href === 'object') {
    if (!/\/$/g.test(href.pathname)) {
      href.pathname += '/';
    }
  } else {
    if (!/\/$/g.test(href)) {
      href += '/';
    }
  }

  return (
    <Link as={as} href={href} {...rest}/>
  );
};