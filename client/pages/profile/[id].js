import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import redirect from "lib/redirect";
import checkLoggedIn from "lib/checkLoggedIn";

import { MainLayout } from "layouts";
import { Avatar, Button, PageCard } from "UI";
import { UserSvg, StarSvg, PhotoSvg, VideoSvg } from "icons";

const cards = [
  {
    title: "1 Card / Ad",
    icon: "user",
    buttonText: "Add new",
    link: "/girls/add"
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

const Profile = ({ loggedInUser }) => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <MainLayout user={loggedInUser}>
      <div className="fluid-container">
        <div className="flex items-center lg:w-7/12 mx-auto py-8">
          <Avatar src="/static/img/Avatar.png"></Avatar>
          <div className="ml-4">
            <span className="text-2xl font-medium">Gladys Hawkins</span>
            <div className="mt-4">
              <Button level="black" size="xxs">
                Private account
              </Button>
              <span className="sm:ml-2">+4179251522</span>
            </div>
          </div>
        </div>
      </div>
      <PageCard>
        <div className="flex flex-col lg:flex-row justify-between">
          <div className="flex lg:flex-1 justify-center lg:justify-end w-auto border-divider border-b lg:border-r">
            <div className="flex flex-col py-10 lg:pr-32">
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

              <div className="mt-5">
                <span className="text-xl font-medium px-5 py-2 rounded-full hover:bg-pink-100 hover:cursor-pointer">
                  Bills and usage
                </span>
              </div>

              <div className="mt-5">
                <span className="text-xl font-medium px-5 py-2 rounded-full hover:bg-pink-100 hover:cursor-pointer">
                  Messages / Chats
                </span>
              </div>

              <div className="mt-5">
                <span className="text-xl font-medium px-5 py-2 rounded-full hover:bg-pink-100 hover:cursor-pointer">
                  Reviews
                </span>
              </div>

              <div className="mt-5">
                <span className="text-xl font-medium px-5 py-2 rounded-full hover:bg-pink-100 hover:cursor-pointer">
                  Settings
                </span>
              </div>
            </div>
          </div>
          <div className="lg:w-3/5 lg:ml-10 px-8 py-12">
            <div className="flex flex-wrap -mx-3">
              {cards &&
                cards.map(({ title, icon, buttonText, link }, index) => (
                  <div
                    className="px-3 w-full md:w-1/2 hd:w-1/3 mb-5"
                    key={index}
                  >
                    <div className="p-5 hd:p-10 border-light-grey border rounded-lg hover:border-transparent hover:bg-white shadow hover:cursor-pointer">
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
                        {link ? (
                          <Link href={link}>
                            <a>
                              <Button className="w-2/3" size="sm">
                                {buttonText}
                              </Button>
                            </a>
                          </Link>
                        ) : (
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
                  <div
                    className="px-3 w-full md:w-1/2 hd:w-1/3 mb-5"
                    key={index}
                  >
                    <div className="p-5 hd:p-10 border-light-grey border rounded-lg hover:border-transparent hover:bg-white shadow hover:cursor-pointer">
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
    </MainLayout>
  );
};

Profile.getInitialProps = async context => {
  const { loggedInUser } = await checkLoggedIn(context.apolloClient);
  if (!loggedInUser) {
    redirect(context, "/login");
  }

  return { loggedInUser };
};

export default Profile;
