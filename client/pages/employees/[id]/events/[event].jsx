import React from "react";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/react-hooks";
import { GET_EVENT } from "queries";
import GoogleMap from "components/GoogleMap";
import { Button } from "UI";
import { CloseSvg } from "icons";
import EmployeeBox from "components/employee/EmployeeBox";

const EventShow = ({ loggedInUser }) => {
  const router = useRouter();
  const { id, event: eventId } = router.query;

  const { data: { event } = {}, loading } = useQuery(GET_EVENT, {
    variables: {
      id: eventId
    }
  });

  if (loading) {
    return "Loading...";
  }

  const [photo] = event && event.photos;

  return (
    <EmployeeBox id={id} user={loggedInUser}>
      <div className="flex -mx-3">
        <div className="w-2/3 px-3">
          <div className="text-2xl font-extrabold my-5">Event with me</div>
          <img
            className="rounded-t-lg w-full object-cover h-80"
            src={photo.url}
            alt=""
          />
          <div className="bg-white rounded-b-lg px-5 py-5">
            {event.description}
          </div>
        </div>
        <div className="w-1/3 px-3">
          <div className="text-2xl font-extrabold my-5">Event Adresse</div>

          <div className="relative w-full h-80 overflow-hidden">
            <GoogleMap className="absolute top-0 left-0 z-20"></GoogleMap>
            <div className="absolute z-30 top-0 right-0 p-3-5">
              <button className="flex justify-center content-center rounded-full bg-white w-10 h-10 focus:outline-none">
                <CloseSvg></CloseSvg>
              </button>
            </div>

            <div className="absolute bottom-0 left-0 z-30 p-6">
              <Button className="px-6" size="sm">
                Get me to the club
              </Button>
            </div>
          </div>
        </div>
      </div>
    </EmployeeBox>
  );
};

EventShow.getInitialProps = async context => {
  return {};
};

export default EventShow;
