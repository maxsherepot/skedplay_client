import React, { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import cx from "classnames";

function Dropdown({ trigger, children }) {
  const node = useRef();
  const [open, setOpen] = useState(false);

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
    setOpen(false);
  };

  return (
    <div ref={node} className="dropdown">
      <div className={cx("dropdown__trigger")} onClick={() => setOpen(true)}>
        {trigger}
      </div>
      <div className={cx("dropdown__content", { open, hidden: !open })}>
        {children}
      </div>
    </div>
  );
}

Dropdown.propTypes = {
  trigger: PropTypes.node.isRequired,
  children: PropTypes.node
};

export default Dropdown;
