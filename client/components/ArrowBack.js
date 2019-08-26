import React from "react";
import Link from "next/link";
import PropTypes from "prop-types";
// import { useQuery } from "@apollo/react-hooks";

// import { GET_CURRENT_REGISTER_STEP } from "queries";

const ArrowBack = ({ href, title }) => {
  // Math.max(step - 1, 0)
  // const { data } = useQuery(GET_CURRENT_REGISTER_STEP);

  return (
    <Link href={href}>
      <a className="animation-arrow-left text-sm">
        <svg
          className="stroke-red inline-block"
          width="13"
          height="16"
          viewBox="0 0 13 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M13 8H1M1 8L7.85714 15M1 8L7.85714 1"
            strokeLinejoin="round"
          />
        </svg>{" "}
        {title}
      </a>
    </Link>
  );
};

ArrowBack.propTypes = {
  href: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
};

export default ArrowBack;
