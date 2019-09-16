import React, { useState } from "react";
import cx from "classnames";
import { PhoneSvg } from "icons";
import { MainLayout } from "layouts";
import { SecondaryNav, ActiveLink } from "UI";

const ClubBox = ({ club, user, children }) => {
  const [showNumber, setToggleNumber] = useState(false);

  const leftInfo = (
    <>
      {club && (
        <span className="text-3xl font-extrabold hd:text-white">
          {club.name}
        </span>
      )}
    </>
  );

  const rightInfo = (
    // Todo: Extract to another component!
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
          <li className="hover:text-red cursor-pointer text-xs sm:text-sm md:text-xl hd:text-2xl px-2 lg:px-5 hd:px-10">
            <ActiveLink
              activeClassName="text-red"
              href={`/clubs/[id]/information`}
              as={`/clubs/${club.id}/information`}
            >
              <a>Information</a>
            </ActiveLink>
          </li>
          <li className="hover:text-red cursor-pointer text-xs sm:text-sm md:text-xl hd:text-2xl px-2 lg:px-5 hd:px-10">
            <ActiveLink
              activeClassName="text-red"
              href={`/clubs/[id]/events`}
              as={`/clubs/${club.id}/events`}
            >
              <a>Events</a>
            </ActiveLink>
          </li>
        </ul>
      </SecondaryNav>

      <div className="fluid-container">{children}</div>
    </MainLayout>
  );
};

export default ClubBox;
