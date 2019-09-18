import React, { useState } from "react";
import cx from "classnames";
import { PhoneSvg } from "icons";
import { MainLayout } from "layouts";
import { SecondaryNav, ActiveLink } from "UI";

const ClubBox = ({ club, user, children }) => {
  const leftInfo = (
    <>
      {club && (
        <div className="flex items-center">
          <div className="text-3xl font-extrabold hd:text-white">
            {club.name}
          </div>
          <div className="bg-black text-white text-xs rounded-full uppercase mt-1 ml-3 px-3 py-1">
            {club.type.name}
          </div>
        </div>
      )}
    </>
  );

  return (
    <MainLayout user={user}>
      <SecondaryNav left={leftInfo}>
        <ul className="flex -mx-4 text-white">
          <li className="hover:text-red cursor-pointer text-xs sm:text-sm md:text-xl hd:text-2xl px-2 sm:px-5 hd:px-10">
            <ActiveLink
              activeClassName="text-red"
              href={`/clubs/[id]/information`}
              as={`/clubs/${club.id}/information`}
            >
              <a>Information</a>
            </ActiveLink>
          </li>
          <li className="hover:text-red cursor-pointer text-xs sm:text-sm md:text-xl hd:text-2xl px-2 sm:px-5 hd:px-10">
            <ActiveLink
              activeClassName="text-red"
              href={`/clubs/[id]/girls`}
              as={`/clubs/${club.id}/girls`}
            >
              <a>Our Girls</a>
            </ActiveLink>
          </li>
          <li className="hover:text-red cursor-pointer text-xs sm:text-sm md:text-xl hd:text-2xl px-2 sm:px-5 hd:px-10">
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
