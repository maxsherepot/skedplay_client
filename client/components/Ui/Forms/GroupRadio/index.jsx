import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

function GroupRadio({ className, name, items, handleChange, defaultValue }) {
  if (!items) return null;

  return (
    <div className={classNames("group-radio", className)}>
      {items.map((item, index) => {
        const indexName = `${name}_${index}`;

        return (
          <Fragment key={indexName}>
            <input
              type="radio"
              name={indexName}
              value={item.value}
              checked={defaultValue == item.value}
              onChange={handleChange}
            />
            <label htmlFor={indexName}>{item.name}</label>
          </Fragment>
        );
      })}
    </div>
  );
}

GroupRadio.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired,
  handleChange: PropTypes.func.isRequired,
  defaultValue: PropTypes.string
};

export default GroupRadio;
