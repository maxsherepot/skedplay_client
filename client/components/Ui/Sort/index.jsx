import PropTypes from "prop-types";
import cx from "classnames";
import {Fragment, useState} from "react";
import React from "react";
import { Dropdown } from "UI";

function Sort({ setFilter, orderBy, sorts }) {

  let initSort;

  if (orderBy) {
    initSort = sorts.find(s => s.orderBy[0].field === orderBy[0].field && s.orderBy[0].order === orderBy[0].order)
  }

  if (!initSort) {
    initSort = sorts[0];
  }

  const [selectedSort, setSort] = useState(initSort);

  function changeSort(sort) {
    setSort(sort);
    setFilter('orderBy', sort.orderBy);
  }

  return (
    <Dropdown
      transparent={true}
      trigger={
        (
          <div
            className={cx(
              "flex items-center h-full pl-4 text-sm",
              "text-black"
            )}
          >
            {selectedSort.label}
          </div>
        )
      }
    >
      {sorts.map((sort, index) => (
        <Fragment key={index}>
          <input
            id={'sort_' + sort.id}
            type="radio"
            value={sort.id}
            checked={selectedSort.id === sort.id}
            name={sort.label}
            onChange={() => changeSort(sort)}
          />
          <label
            className={cx(
              "block cursor-pointer leading-loose hover:text-red select-none",
              selectedSort.id === sort.id ? "text-red" : "text-black"
            )}
            htmlFor={'sort_' + sort.id}
          >
            {sort.label}
          </label>
        </Fragment>
      ))}
    </Dropdown>
  );
}

Sort.propTypes = {
  children: PropTypes.node,
  // client: PropTypes.object.required
};

export default Sort;
