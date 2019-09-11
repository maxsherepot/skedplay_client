import React from "react";

import { ArrowBack } from "UI";

const SecondaryNav = ({ left, children, right }) => {
  return (
    <>
      <div
        className="py-4"
        style={{
          background:
            "linear-gradient(90deg, #9854a3, #5f3466,#241327, #010101)"
        }}
      >
        <div className="fluid-container">
          <div className="flex items-center justify-around sm:justify-between">
            <div className="flex items-center -mx-4">
              <ArrowBack
                className="px-2"
                color="white"
                href="/girls"
              ></ArrowBack>
              <div className="hidden hd:flex items-center px-2">{left}</div>
            </div>

            {children}

            <span className="hidden lg:block">{right}</span>
          </div>
        </div>
      </div>
      <div className="fluid-container hd:hidden">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="flex flex-col md:flex-row items-center mb-4 md:mt-4">
            {left}
          </div>

          <div className="w-full md:w-auto lg:hidden">{right}</div>
        </div>
      </div>
    </>
  );
};

export default SecondaryNav;
