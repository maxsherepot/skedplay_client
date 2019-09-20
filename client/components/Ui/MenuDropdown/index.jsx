import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import cx from "classnames";

function MenuDropdown({ className, open, children, toggle }) {
  const node = useRef();

  useEffect(() => {
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  const handleClickOutside = e => {
    if (node.current.contains(e.target)) {
      // inside click
      return;
    }
    // outside click
    toggle(false);
  };

  return (
    <div
      ref={node}
      className={cx("absolute top-0 right-0", className, {
        open,
        hidden: !open
      })}
    >
      <div className="h-auto overflow-visible bg-white border border-black z-50 w-full rounded-lg">
        {children}
      </div>
    </div>
  );
}

MenuDropdown.defaultProps = {
  open: false
};

MenuDropdown.propTypes = {
  className: PropTypes.string,
  open: PropTypes.bool,
  children: PropTypes.node
};

export default MenuDropdown;
