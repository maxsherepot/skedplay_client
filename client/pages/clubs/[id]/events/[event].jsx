import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useQuery } from "@apollo/react-hooks";
import { GET_CLUB, GET_EVENT } from "queries";
import { Button, Gallery, EventLabel } from "UI";
import { ClubBox } from "components/club";
import { ArrowNextSvg } from "icons";
import checkLoggedIn from "lib/checkLoggedIn";

const EventShow = ({ loggedInUser }) => {
  const router = useRouter();
  const { id, event: eventId } = router.query;

  const { data: { club } = {}, loading: clubLoading } = useQuery(GET_CLUB, {
    variables: {
      id
    }
  });

  const { data: { event } = {}, loading: eventLoading } = useQuery(GET_EVENT, {
    variables: {
      id: eventId
    }
  });

  if (clubLoading || eventLoading) {
    return "Loading...";
  }

  const [photo] = event && event.photos;

  const sidebarColumn = <Gallery photos={club.photos}></Gallery>;

  const contentColumn = (
    <div className="flex -mx-3">
      <div className="w-full px-3">
        <div className="flex items-end my-5">
          <div className="text-2xl font-extrabold tracking-tighter">
            Event in {club.name}
          </div>
          <Link href={`/clubs/[id]/events`} as={`/clubs/${club.id}/events`}>
            <a className="block text-sm whitespace-no-wrap transition leading-loose hover:text-red ml-4">
              <ArrowNextSvg>
                <span className="mr-1">All club events</span>
              </ArrowNextSvg>
            </a>
          </Link>
        </div>

        <div className="relative overflow-hidden">
          <img
            className="rounded-t-lg w-full object-cover h-80"
            src={photo.url}
            alt=""
          />
          <div className="absolute bottom-0 left-0 p-4 text-2xl font-black text-white z-30">
            <div className="flex flex-wrap -mx-3">
              <div className="px-3">
                <Button
                  className="text-xs px-2 lg:px-4"
                  weight="normal"
                  size="xxs"
                >
                  TODAY
                </Button>
              </div>
              <div className="px-3">
                <EventLabel type={event.type}></EventLabel>
              </div>
            </div>
            <div className="text-2xl font-extrabold truncate my-5">
              {event.title}
            </div>
          </div>
        </div>
        <div className="bg-white rounded-b-lg px-5 py-5">
          {event.description}
        </div>
      </div>
    </div>
  );

  return (
    <ClubBox club={club} user={loggedInUser}>
      <div className="flex flex-wrap -mx-3">
        <div className="w-full lg:w-2/5 px-3">
          <div className="text-2xl font-extrabold my-5">Fotogalerie</div>
          {sidebarColumn}
        </div>
        <div className="w-full lg:w-3/5 px-3">{contentColumn}</div>
      </div>
    </ClubBox>
  );
};

EventShow.getInitialProps = async context => {
  const { loggedInUser } = await checkLoggedIn(context.apolloClient);
  if (!loggedInUser) {
    return {};
  }
  return { loggedInUser };
};

export default EventShow;
