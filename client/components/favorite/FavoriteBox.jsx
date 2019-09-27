import React from "react";
import { MainLayout } from "layouts";
import { SecondaryNav, ActiveLink } from "UI";

const FavoriteBox = ({ user, children }) => {
  const leftInfo = (
    <div className="hidden hd:block text-3xl font-extrabold hd:text-white">
      Favorites
    </div>
  );

  return (
    <MainLayout user={user}>
      <SecondaryNav left={leftInfo}>
        <ul className="flex -mx-4 text-white">
          <li className="hover:text-red cursor-pointer text-xs sm:text-sm md:text-xl hd:text-2xl px-5 hd:px-10">
            <ActiveLink activeClassName="text-red" href="/favorites/girls">
              <a>Girls</a>
            </ActiveLink>
          </li>
          <li className="hover:text-red cursor-pointer text-xs sm:text-sm md:text-xl hd:text-2xl px-5 hd:px-10">
            <ActiveLink activeClassName="text-red" href="/favorites/clubs">
              <a>Clubs</a>
            </ActiveLink>
          </li>
          <li className="hover:text-red cursor-pointer text-xs sm:text-sm md:text-xl hd:text-2xl px-5 hd:px-10">
            <ActiveLink activeClassName="text-red" href="/favorites/events">
              <a>Events</a>
            </ActiveLink>
          </li>
        </ul>
      </SecondaryNav>

      <div className="fluid-container">{children}</div>
    </MainLayout>
  );
};

export default FavoriteBox;
