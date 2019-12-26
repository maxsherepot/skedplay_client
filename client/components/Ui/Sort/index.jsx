import PropTypes from "prop-types";
import {useApolloClient} from "@apollo/react-hooks";
import cx from "classnames";
import {Fragment, useState} from "react";
import React from "react";
import { Dropdown } from "UI";

function Sort({ children, setFilter, orderBy }) {
  // const client = useApolloClient();

  const sorts = [
    {
      id: 1,
      label: 'First: young',
      orderBy: [
        {
          field: "age",
          order: 'ASC',
        }
      ],
    },
    {
      id: 2,
      label: 'First: old',
      orderBy: [
        {
          field: "age",
          order: 'DESC',
        }
      ],
    },
  ];

  let initSort;

  if (orderBy) {
    initSort = sorts.find(s => s.orderBy[0].field === orderBy[0].field && s.orderBy[0].order === orderBy[0].order)
  }
  console.log(orderBy, initSort);
  if (!initSort) {
    initSort = sorts[0];
  }

  const [selectedSort, setSort] = useState(initSort);

  function changeSort(sort) {
    setSort(sort);
    setFilter('orderBy', sort.orderBy);
  }

  return (
    <div className="fluid-container flex justify-between my-6">
      {children}

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


      {/*<select onChange={changeSort}>*/}
        {/*{sorts.map(sort => {*/}
          {/*return (*/}
            {/*<option value={sort.id} key={sort.id}>{sort.label}</option>*/}
          {/*)*/}
        {/*})}*/}
      {/*</select>*/}
    </div>
  );
}

Sort.propTypes = {
  children: PropTypes.node,
  // client: PropTypes.object.required
};

export default Sort;
