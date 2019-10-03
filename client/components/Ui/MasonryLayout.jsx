import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

const MasonryLayout = props => {
  const [columns, setColumns] = useState(3);
  const columnWrapper = {};
  const result = [];

  useEffect(() => {
    calcColumns();

    if (window) {
      window.addEventListener("resize", calcColumns);
    }

    return () => {
      if (window) {
        window.removeEventListener("resize", calcColumns);
      }
    };
  });

  const calcColumns = () => {
    const windowWidth = (window && window.innerWidth) || Infinity;

    let matchedBreakpoint = Infinity;
    let cols = props.breakpoints.default || 3;

    for (let breakpoint in props.breakpoints) {
      const optBreakpoint = parseInt(breakpoint);
      const isCurrentBreakpoint =
        optBreakpoint > 0 && windowWidth <= optBreakpoint;

      if (isCurrentBreakpoint && optBreakpoint < matchedBreakpoint) {
        matchedBreakpoint = optBreakpoint;
        cols = props.breakpoints[breakpoint];
      }
    }

    cols = Math.max(1, parseInt(cols) || 1);

    if (cols !== columns) {
      setColumns(cols);
    }
  };

  for (let i = 0; i < columns; i++) {
    columnWrapper[`column${i}`] = [];
  }

  for (let i = 0; i < props.children.length; i++) {
    const columnIndex = i % columns;
    columnWrapper[`column${columnIndex}`].push(
      <div key={i} style={{ marginBottom: `${props.gap}px` }}>
        {props.children[i]}
      </div>
    );
  }

  for (let i = 0; i < columns; i++) {
    result.push(
      <div
        key={i}
        style={{
          marginLeft: `${i > 0 ? props.gap : 0}px`,
          flex: 1
        }}
      >
        {columnWrapper[`column${i}`]}
      </div>
    );
  }

  return (
    <div className={props.className} style={{ display: "flex" }}>
      {result}
    </div>
  );
};

MasonryLayout.propTypes = {
  breakpoints: PropTypes.object.isRequired,
  className: PropTypes.string,
  gap: PropTypes.number.isRequired,
  children: PropTypes.arrayOf(PropTypes.element)
};
MasonryLayout.defaultProps = {
  breakpoints: {},
  gap: 20
};

export default MasonryLayout;
