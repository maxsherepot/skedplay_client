import React, {useState} from "react";
import cx from "classnames";
import PropTypes from "prop-types";
import Popover from 'react-tiny-popover'

function Label({
  name,
  className,
  label,
  error,
  maxErrorLength
}) {
  let errorText = error;
  let showTooltip = false;

  const [isPopoverOpen, setPopoverOpen] = useState(false);

  if (error ) {
    errorText = label;
    showTooltip = true;
  }

  return (
    <label className={className} htmlFor={name}>
      {errorText ? errorText : label}
      {showTooltip &&
        <Popover
          containerStyle={{zIndex: 111}}
          isOpen={isPopoverOpen}
          position={'top'} // preferred position
          content={(
            <div className="rounded-lg bg-light-grey break-words p-4 z-100">
              {error}
            </div>
          )}
        >
          <span
            className="cursor-pointer pl-2"
            onClick={() => setPopoverOpen(!isPopoverOpen)}
            onMouseEnter={() => setPopoverOpen(true)}
            onMouseLeave={() => setPopoverOpen(false)}
          >
            <img src="/static/img/info.png" alt="" className="inline-block"/>
          </span>
        </Popover>
      }
    </label>
  );
}

Label.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string,
  label: PropTypes.string,
  error: PropTypes.string,
  maxErrorLength: PropTypes.number,
};

Label.defaultProps = {
  maxErrorLength: 30
};

export default Label;
