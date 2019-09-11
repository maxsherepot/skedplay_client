import React, { useState } from "react";
import cx from "classnames";
import { PhoneSvg } from "icons";
import { MainLayout } from "layouts";
import { GET_EMPLOYEE } from "queries";
import { useQuery } from "@apollo/react-hooks";
import { Gallery, SecondaryNav, Button, AddressCard } from "UI";
import GirlsViewedBox from "components/employee/GirlsViewedBox";

const EmployeeBox = ({ children, id, user }) => {
  const { data } = useQuery(GET_EMPLOYEE, {
    variables: {
      id
    }
  });
  const [showNumber, setToggleNumber] = useState(false);

  const left = (
    <>
      {data.employee && (
        <span className="text-3xl font-black hd:text-white">
          {data.employee.name} {data.employee.age}
        </span>
      )}
      <Button
        className="ml-4 uppercase"
        size="xxs"
        level="success"
        weight="normal"
      >
        Available
      </Button>
    </>
  );

  const rightButton = (
    <div className="flex items-center justify-center bg-red text-white px-8 py-3 rounded-full cursor-pointer">
      <PhoneSvg></PhoneSvg>
      <span
        className={cx("block ml-2 whitespace-no-wrap overflow-hidden", {
          "w-10": !showNumber
        })}
      >
        +48715254152
      </span>
      {!showNumber && (
        <span
          className="ml-4 whitespace-no-wrap"
          onClick={() => setToggleNumber(!showNumber)}
        >
          Show phone
        </span>
      )}
    </div>
  );

  return (
    <MainLayout user={user}>
      <SecondaryNav left={left} right={rightButton}>
        <ul className="flex -mx-4 text-white">
          <li className="hover:text-red cursor-pointer text-xs sm:text-sm md:text-xl hd:text-2xl px-2 lg:px-5 hd:px-10">
            Information
          </li>
          <li className="hover:text-red cursor-pointer text-xs sm:text-sm md:text-xl hd:text-2xl px-2 lg:px-5 hd:px-10">
            Events
          </li>
          <li className="hover:text-red cursor-pointer text-xs sm:text-sm md:text-xl hd:text-2xl px-2 lg:px-5 hd:px-10">
            Reviews
            <span className="hidden md:inline-block bg-white text-red px-2 rounded-full text-xs ml-1">
              172
            </span>
          </li>
          <li className="hover:text-red cursor-pointer text-xs sm:text-sm md:text-xl hd:text-2xl px-2 lg:px-5 hd:px-10">
            Chat
            <span className="hidden md:inline-block bg-white text-red px-2 rounded-full text-xs ml-1">
              +4
            </span>
          </li>
        </ul>
      </SecondaryNav>

      <div className="fluid-container">
        <div className="flex flex-wrap -mx-3">
          <div className="w-full lg:w-1/4 px-3">
            <div className="text-2xl font-extrabold my-5">Fotogalerie</div>
            {data.employee && <Gallery photos={data.employee.photos}></Gallery>}

            <AddressCard />
          </div>
          <div className="w-full lg:w-3/4 px-3">{children}</div>
        </div>
        <GirlsViewedBox />
      </div>
    </MainLayout>
  );
};

export default EmployeeBox;
