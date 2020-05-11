import { useRouter } from "next/router";
import PropTypes from "prop-types";
import Link from 'components/SlashedLink'
import React, { Children } from "react";

const ActiveLink = ({ children, activeClassName, ...props }) => {
  const { pathname } = useRouter();
  const child = Children.only(children);

  const className =
    pathname === props.href
      ? `${child.props.className} ${activeClassName}`
      : child.props.className;

  return <Link {...props}>{React.cloneElement(child, { className })}</Link>;
};

ActiveLink.defaultProps = {
  activeClassName: ""
};

ActiveLink.propTypes = {
  activeClassName: PropTypes.string
};

export default ActiveLink;
