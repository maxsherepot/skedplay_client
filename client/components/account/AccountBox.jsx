import React from "react";
import Link from "next/link";
import { MainLayout } from "layouts";
import { Avatar, Button, PageCard } from "UI";
import { AccountLabel } from "components/account";
import { AddSvg, ChevronDownSvg, ChevronRightSvg } from "icons";

const ProfileHeader = ({ user }) => (
  <div className="fluid-container">
    <div className="flex items-center lg:w-7/12 mx-auto py-8">
      <Avatar src="/static/img/Avatar.png" />
      <div className="ml-4">
        <span className="text-2xl font-medium">{user.name}</span>
        <div className="flex mt-4">
          <AccountLabel {...user} />
          <span className="sm:ml-2">{user.phone}</span>
        </div>
      </div>
    </div>
  </div>
);

const ClubMenu = ({ clubs, collapse, setCollapse }) => {
  return clubs.map(({ id, name, employees, events }, i) => {
    const isCollapsed = collapse === i;
    return (
      <div key={id} onClick={() => setCollapse(i)}>
        <span className="flex items-center text-xl font-medium px-5 py-2 hover:cursor-pointer">
          {isCollapsed ? <ChevronDownSvg /> : <ChevronRightSvg />}
          <span className="ml-4">{name}</span>
        </span>
        {isCollapsed && (
          <div className="ml-12 font-medium">
            <div className="text-red p-1 cursor-pointer">
              Sex workers cards
              <span className="ml-3 py-1 px-3 bg-red text-white text-sm rounded-full">
                {(employees && employees.length) || 0}
              </span>
            </div>
            <Link href="/girls/add">
              <a className="flex items-center text-black font-normal text-sm p-1 cursor-pointer">
                <AddSvg />
                <span className="ml-2"> Add new card</span>
              </a>
            </Link>
            <div className="text-red p-1 cursor-pointer">
              Archive Sex workers
            </div>
            <div className="text-red p-1 cursor-pointer">
              Events
              <span className="ml-3 py-1 px-3 bg-red text-white text-sm rounded-full">
                {(events && events.length) || 0}
              </span>
            </div>
            <div className="text-red p-1 cursor-pointer">Admin / Edit</div>
            <div className="text-red p-1 cursor-pointer">Webpage</div>
          </div>
        )}
      </div>
    );
  });
};

const Sidebar = ({ user: { is_club_owner, is_employee, clubs, employee }, collapse, setCollapse }) => (
  <div className="flex lg:flex-1 justify-center lg:justify-end w-auto border-divider border-b lg:border-r">
    <div className="flex flex-col py-10 lg:pr-32">
      {is_employee && (
        <div>
          <span className="text-xl font-medium px-5 py-2 rounded-full hover:bg-pink-100 hover:cursor-pointer">
            My Ad/Cards
          </span>
          <ul className="text-lg text-red font-medium leading-loose ml-10 mt-4">
            <li>Add new AD+</li>
            <li>
              Active AD
              <span className="ml-3 py-1 px-3 bg-red text-white text-sm rounded-full">
                12
              </span>
            </li>
            <li>Archive</li>
          </ul>
        </div>
      )}

      {is_employee && (
        <div className="mt-5">
          <span className="text-xl font-medium px-5 py-2 rounded-full hover:bg-pink-100 hover:cursor-pointer">
            My Events
          </span>
          <ul className="text-lg text-red font-medium leading-loose ml-10 mt-4">
            <li>Add new Event</li>
            <li>
              Active Events
              <span className="ml-3 py-1 px-3 bg-red text-white text-sm rounded-full">
                4
              </span>
            </li>
            <li>Archive</li>
          </ul>
        </div>
      )}

      {is_club_owner && (
        <>
          <div className="text-2xl font-extrabold px-5 mt-5">
            You have {clubs.length} clubs
          </div>

          <ClubMenu clubs={clubs} collapse={collapse} setCollapse={setCollapse} />

          <Link href="/clubs/add">
            <a className="ml-5 mt-5">
              <Button className="px-8" size="sm">
                Add new club
              </Button>
            </a>
          </Link>
        </>
      )}

      {is_club_owner && (
        <div className="text-2xl font-extrabold px-5 mt-5">Menu</div>
      )}

      <div className="mt-4">
        <span className="text-xl font-medium px-5 py-2 rounded-full hover:bg-pink-100 hover:cursor-pointer">
          Bills and usage
        </span>
      </div>

      <div className="mt-4">
        <span className="text-xl font-medium px-5 py-2 rounded-full hover:bg-pink-100 hover:cursor-pointer">
          Messages / Chats
        </span>
      </div>

      {employee && employee.reviews && employee.reviews.length && (
        <div className="mt-4">
        <span className="text-xl font-medium px-5 py-2 rounded-full hover:bg-pink-100 hover:cursor-pointer">
          Reviews
        </span>
      </div>
      )}

      <div className="mt-4">
        <Link href="/account/settings">
          <a className="text-xl font-medium px-5 py-2 rounded-full hover:bg-pink-100 hover:cursor-pointer">
            Settings
          </a>
        </Link>
      </div>
    </div>
  </div>
);

const AccountBox = ({ user, collapse, setCollapse, children }) => {
  return (
    <MainLayout user={user}>
      <ProfileHeader user={user} />
      <PageCard>
        <div className="flex flex-col lg:flex-row justify-between">
          <Sidebar collapse={collapse} setCollapse={setCollapse} user={user} />
          <div className="lg:w-3/5 lg:ml-10 px-8 py-12">{children}</div>
        </div>
      </PageCard>
    </MainLayout>
  );
};

export default AccountBox;
