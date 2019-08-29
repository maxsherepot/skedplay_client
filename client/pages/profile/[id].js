import React from "react";
import { useRouter } from "next/router";
import checkLoggedIn from "lib/checkLoggedIn";

import { Header, Avatar, Button, PageCard } from "UI";

const UserSvg = () => (
  <svg
    width="36"
    height="40"
    viewBox="0 0 36 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M35 39V34.7778C35 32.5382 34.1045 30.3903 32.5104 28.8067C30.9163 27.223 28.7543 26.3333 26.5 26.3333H9.5C7.24566 26.3333 5.08365 27.223 3.48959 28.8067C1.89553 30.3903 1 32.5382 1 34.7778V39M26.5 9.44444C26.5 14.1082 22.6944 17.8889 18 17.8889C13.3056 17.8889 9.5 14.1082 9.5 9.44444C9.5 4.78071 13.3056 1 18 1C22.6944 1 26.5 4.78071 26.5 9.44444Z"
      stroke="#CCCCCC"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const cards = [
  {
    title: "1 Card / Ad",
    icon: "user",
    buttonText: "Add new"
  },
  {
    title: "2 Events",
    icon: "user",
    buttonText: "Add new"
  },
  {
    title: "233 photos",
    icon: "user",
    buttonText: null
  },
  {
    title: "2 videos",
    icon: "user",
    buttonText: null
  }
];

const Invoice = ({ loggedInUser }) => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <>
      <Header user={loggedInUser} className="nav__theme_white" />
      <div className="container my-6">
        <div className="w-7/12 mx-auto">
          <div className="flex items-center">
            <Avatar src="/static/img/Avatar.png"></Avatar>
            <div className="ml-4">
              <span className="text-2xl font-medium">Gladys Hawkins</span>
              <div className="mt-4">
                <Button level="black" size="xxs">
                  Private account
                </Button>
                <span className="ml-2">+4179251522</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <PageCard>
        <div className="flex">
          <div className="flex justify-end w-2/5 border-divider border-r">
            <div className="flex flex-col w-1/2 py-16 px-2">
              <div>
                <span className="text-xl font-medium">My Ad/Cards</span>
                <ul className="text-lg text-red font-medium leading-loose ml-8 mt-2">
                  <li>Add new AD+</li>
                  <li>Active AD</li>
                  <li>Archive</li>
                </ul>
              </div>

              <div className="mt-4">
                <span className="text-xl font-medium">My Events</span>
                <ul className="text-lg text-red font-medium leading-loose ml-8 mt-2">
                  <li>Add new Event</li>
                  <li>Active Events</li>
                  <li>Archive</li>
                </ul>
              </div>

              <div className="mt-4">
                <span className="text-xl font-medium">Bills and usage</span>
              </div>

              <div className="mt-4">
                <span className="text-xl font-medium">Messages / Chats</span>
              </div>

              <div className="mt-4">
                <span className="text-xl font-medium hover:bg-red">
                  Reviews
                </span>
              </div>

              <div className="mt-4">
                <span className="text-xl font-medium">Settings</span>
              </div>
            </div>
          </div>
          {/* <div className="w-3/5 px-2">
            <div className="flex flex-wrap items-center h-full w-2/3 -mx-2">
              {cards &&
                cards.map(({ title, icon, buttonText }, index) => (
                  <div className="px-2 w-full">
                    <div
                      className="w-1/2 p-10 border-light-grey border rounded"
                      key={index}
                    >
                      <div className="flex flex-col justify-center h-full">
                        <div className="flex justify-between">
                          <span className="text-2xl font-bold mb-6">
                            {title}
                          </span>
                          <UserSvg></UserSvg>
                        </div>
                        {buttonText && (
                          <Button className="w-2/3" size="sm">
                            {buttonText}
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div> */}
        </div>
      </PageCard>
    </>
  );
};

Invoice.getInitialProps = async context => {
  const { loggedInUser } = await checkLoggedIn(context.apolloClient);
  if (!loggedInUser) {
    redirect(context, "/login");
  }

  return { loggedInUser };
};

export default Invoice;
