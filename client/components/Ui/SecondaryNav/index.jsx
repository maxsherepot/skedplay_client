import React from "react";

import { ArrowBack } from "UI";

const SecondaryNav = ({ left, children, right, breadcrumbs, title }) => {
  return (
    <>
      <div
        className="bg-white border-b border-xs-grey"
      >
        <div className="container">
          <div className="flex items-center justify-around sm:justify-between">
            <div className="flex items-center -mx-4">
              <ArrowBack className="px-4" color="red" back/>
              <div className="hidden xl:flex items-center px-2">{left}</div>
            </div>

            {children}

            <span className="hidden lg:block">{right}</span>
          </div>
        </div>
      </div>
      {breadcrumbs}
      <div className="container xl:hidden">
        <div className="flex flex-col md:flex-row items-center justify-center">
          {left}

          <div className="w-full md:w-auto lg:hidden">{right}</div>
        </div>
      </div>
    </>
  );
};

export default SecondaryNav;
