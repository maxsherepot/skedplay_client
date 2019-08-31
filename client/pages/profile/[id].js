import React from "react";
import { useRouter } from "next/router";
import redirect from "lib/redirect";
import checkLoggedIn from "lib/checkLoggedIn";

import { Header, Footer, Avatar, Button, PageCard } from "UI";
import { UserSvg, StarSvg, PhotoSvg, VideoSvg } from "icons";

const cards = [
  {
    title: "1 Card / Ad",
    icon: "user",
    buttonText: "Add new"
  },
  {
    title: "2 Events",
    icon: "star",
    buttonText: "Add new"
  }
];

const counters = [
  {
    title: "233 photos",
    icon: "photo",
    buttonText: null
  },
  {
    title: "2 videos",
    icon: "video",
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
        <div className="flex justify-between">
          <div className="flex flex-1 justify-end w-auto border-divider border-r">
            <div className="flex flex-col py-16 pr-44">
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
          <div className="w-3/5 px-8 py-16">
            <div className="flex flex-wrap -mx-3">
              {cards &&
                cards.map(({ title, icon, buttonText }, index) => (
                  <div className="px-3 w-1/3 mb-5" key={index}>
                    <div className="p-10 border-light-grey border rounded">
                      <div className="flex flex-col justify-center h-full">
                        <div className="flex justify-between">
                          <span className="text-2xl font-bold mb-6">
                            {title}
                          </span>
                          {icon === "user" ? (
                            <UserSvg></UserSvg>
                          ) : (
                            <StarSvg></StarSvg>
                          )}
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
            <div className="flex flex-wrap -mx-3">
              {counters &&
                counters.map(({ title, icon, buttonText }, index) => (
                  <div className="px-3 w-1/3 mb-5" key={index}>
                    <div className="p-10 border-light-grey border rounded">
                      <div className="flex flex-col justify-center h-full">
                        <div className="flex justify-between">
                          <span className="text-2xl font-bold mb-6">
                            {title}
                          </span>
                          {icon === "photo" ? (
                            <PhotoSvg></PhotoSvg>
                          ) : (
                            <VideoSvg></VideoSvg>
                          )}
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
          </div>
        </div>
      </PageCard>
      <Footer />
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
