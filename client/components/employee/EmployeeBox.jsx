import React, { useState } from "react";
import cx from "classnames";
import { PhoneSvg } from "icons";
import { MainLayout } from "layouts";
import { SecondaryNav, Button, ActiveLink } from "UI";
import GirlsViewedBox from "components/employee/GirlsViewedBox";

const EmployeeBox = ({ employee, user, viewed, children }) => {
  const [showNumber, setToggleNumber] = useState(false);

  const leftInfo = (
    <div className="flex flex-col md:flex-row items-center mb-4 md:mt-4">
      {employee && (
        <span className="text-3xl font-extrabold hd:text-white">
          {employee.name} {employee.age}
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
    </div>
  );

  const rightInfo = (
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
      <SecondaryNav left={leftInfo} right={rightInfo}>
        <ul className="flex -mx-4 text-white">
          <li className="hover:text-red cursor-pointer text-xs sm:text-sm md:text-xl hd:text-2xl px-2 sm:px-5 hd:px-10">
            <ActiveLink
              activeClassName="text-red"
              href={`/employees/[id]/information`}
              as={`/employees/${employee.id}/information`}
            >
              <a>Information</a>
            </ActiveLink>
          </li>
          <li className="hover:text-red cursor-pointer text-xs sm:text-sm md:text-xl hd:text-2xl px-2 sm:px-5 hd:px-10">
            <ActiveLink
              activeClassName="text-red"
              href={`/employees/[id]/events`}
              as={`/employees/${employee.id}/events`}
            >
              <a>Events</a>
            </ActiveLink>
          </li>
          <li className="hover:text-red cursor-pointer text-xs sm:text-sm md:text-xl hd:text-2xl px-2 sm:px-5 hd:px-10">
            <ActiveLink
              activeClassName="text-red"
              href={`/employees/[id]/reviews`}
              as={`/employees/${employee.id}/reviews`}
            >
              <a>Reviews</a>
            </ActiveLink>

            <span className="hidden md:inline-block bg-white text-red px-2 rounded-full text-xs ml-1">
              {(employee.reviews && employee.reviews.length) || 0}
            </span>
          </li>
          {(user && user.is_client) &&
            <li className="hover:text-red cursor-pointer text-xs sm:text-sm md:text-xl hd:text-2xl px-2 sm:px-5 hd:px-10">
              <ActiveLink
                activeClassName="text-red"
                href={`/employees/[id]/chat`}
                as={`/employees/${employee.id}/chat`}
              >
                <a>Chat</a>
              </ActiveLink>
              {employee.unread_messages_count > 0 &&
                <span className="hidden md:inline-block bg-white text-red px-2 rounded-full text-xs ml-1">
                  +{employee.unread_messages_count}
                </span>
              }
            </li>
          }
        </ul>
      </SecondaryNav>

      <div className="fluid-container">
        {children}
        {viewed && <GirlsViewedBox />}
      </div>
    </MainLayout>
  );
};

EmployeeBox.defaultProps = {
  viewed: true
};

export default EmployeeBox;
