import React, {useEffect, useState, useRef, Children} from "react";
import PropTypes from "prop-types";
import cx from "classnames";

function Dropdown({ classes, trigger, triggerClassName, triggerStyle, disabled, contentStyle, children, transparent, lang }) {
  const node = useRef();
  const [open, setOpen] = useState(false);

  const close = () => setOpen(false);

  const childrenArray = React.Children.map(children, child => {
    return React.cloneElement(child, {
      close
    });
  });

  const Children = children;

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
    <div ref={node} className={cx([
      "dropdown",
      classes,
      transparent ? "transparent" : "",
      lang ? "lang" : "",
    ])}>
      <div
        className={cx("dropdown__trigger", triggerClassName, {
          "dropdown__trigger--disabled": disabled
        })}
        style={triggerStyle}
        onClick={() => setOpen(true)}
      >
        {trigger}
      </div>
      <div
        className={cx("dropdown__content", { open, hidden: disabled || !open })}
        style={contentStyle}
      >
        {typeof children === 'function' ? <Children close={close} /> : childrenArray}
      </div>
    </div>
  );
}

Dropdown.propTypes = {
  trigger: PropTypes.node.isRequired,
  // children: PropTypes.node
};

export default Dropdown;
