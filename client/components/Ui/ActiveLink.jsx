import { useRouter } from "next/router";
import PropTypes from "prop-types";
import Link from 'components/SlashedLink'
import React, { Children } from "react";
import cx from 'classnames';

const ActiveLink = ({ children, wrapClass, activeClassName, advancedBlock, ...props }) => {
  const { asPath } = useRouter();
  const child = Children.only(children);

  const active = asPath.indexOf(props.as) !== -1  || asPath.indexOf(props.href) !== -1;

  const className =
    active
      ? `${child.props.className} ${activeClassName}`
      : child.props.className;

  return (
    <li
      className={cx(
        "relative py-5 text-grey hover:text-black cursor-pointer text-xs sm:text-sm md:text-md hd:text-xl px-2 sm:px-5 hd:px-10",
        wrapClass,
      )}
    >
      <Link {...props}>{React.cloneElement(child, { className })}</Link>

      {active &&
        <div className="absolute left-0 bottom-0 w-full h-2px bg-dark-green"/>
      }

      {advancedBlock}
    </li>
  );
};

ActiveLink.defaultProps = {
  activeClassName: ""
};

ActiveLink.propTypes = {
  activeClassName: PropTypes.string
};

export default ActiveLink;
