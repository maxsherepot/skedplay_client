import React from "react";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/react-hooks";
import { GET_EMPLOYEE, GET_EVENT } from "queries";
import { CloseSvg } from "icons";
import { Button, Gallery, AddressCard, EventLabel } from "UI";
import checkLoggedIn from "lib/checkLoggedIn";
import GoogleMap from "components/GoogleMap";
import EmployeeBox from "components/employee/EmployeeBox";

const EventShow = ({ loggedInUser }) => {
  const router = useRouter();
  const { id, event: eventId } = router.query;

  const { data: { employee } = {}, loading: employeeLoading } = useQuery(
    GET_EMPLOYEE,
    {
      variables: {
        id
      }
    }
  );

  const { data: { event } = {}, loading: eventLoading } = useQuery(GET_EVENT, {
    variables: {
      id: eventId
    }
  });

  if (employeeLoading || eventLoading) {
    return "Loading...";
  }

  const [photo] = event && event.photos;

  const sidebarColumn = (
    <>
      <Gallery photos={employee.photos} />
      <AddressCard isAvailable={false} />
    </>
  );

  const contentColumn = (
    <div className="flex flex-col lg:flex-row -mx-3">
      <div className="w-full lg:w-2/3 px-3">
        <div className="text-2xl font-extrabold my-5">Event with me</div>
        <div className="relative">
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
            <a>Ultra Party</a>
            {/* title */}
          </div>
        </div>

        <div className="bg-white rounded-b-lg px-5 py-5">
          {event.description}
        </div>
      </div>
      <div className="w-full lg:w-1/3 px-3">
        <div className="text-2xl font-extrabold my-5">Event Adresse</div>

        <div className="relative w-full h-80 overflow-hidden">
          <GoogleMap className="absolute top-0 left-0 z-20" />
          <div className="absolute z-30 top-0 right-0 p-3-5">
            <button className="flex justify-center content-center rounded-full bg-white w-10 h-10 focus:outline-none">
              <CloseSvg />
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
  );

  return (
    <EmployeeBox employee={employee} user={loggedInUser}>
      <div className="flex flex-wrap -mx-3">
        <div className="w-full lg:w-3/12 px-3">
          <div className="text-2xl font-extrabold my-5">Fotogalerie</div>
          {sidebarColumn}
        </div>
        <div className="w-full lg:w-9/12 px-3">{contentColumn}</div>
      </div>
    </EmployeeBox>
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
