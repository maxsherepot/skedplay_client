import React from "react";
import Router from "next/router";
import PropTypes from "prop-types";
import { useQuery } from "@apollo/react-hooks";

import { GET_CURRENT_REGISTER_STEP } from "queries";

const ArrowBack = ({ href, title }) => {
  const {
    data: { currentRegisterStep: step },
    client
  } = useQuery(GET_CURRENT_REGISTER_STEP);

  const handleBack = () => {
    console.log("handleBack with step: ", step);
    if (step === 0) {
      return Router.push(href);
    }

    client.writeData({
      data: {
        currentRegisterStep: Math.max(step - 1, 0)
      }
    });
  };

  return (
    <a
      className="animation-arrow-left text-sm cursor-pointer"
      onClick={handleBack}
    >
      <svg
        className="stroke-red inline-block"
        width="13"
        height="16"
        viewBox="0 0 13 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M13 8H1M1 8L7.85714 15M1 8L7.85714 1" strokeLinejoin="round" />
      </svg>{" "}
      {title}
    </a>
  );
};

ArrowBack.propTypes = {
  href: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
};

export default ArrowBack;
