import { usePagination } from "hooks";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/react-hooks";
import checkLoggedIn from "lib/checkLoggedIn";
import { ALL_EVENTS, GET_EMPLOYEE } from "queries";
import EmployeeBox from "components/employee/EmployeeBox";
import { EventCard, Gallery, Pagination, AddressCard } from "UI";

const Events = ({ loggedInUser }) => {
  const router = useRouter();
  const { id } = router.query;
  const [page, setPage] = usePagination();

  const { data: { employee } = {}, loading: employeeLoading } = useQuery(
    GET_EMPLOYEE,
    {
      variables: {
        id
      }
    }
  );

  const { data: { events } = {}, loading: eventsLoading } = useQuery(
    ALL_EVENTS,
    {
      variables: {
        first: 8,
        page
      }
    }
  );

  if (employeeLoading || eventsLoading) {
    return "Loading...";
  }

  const sidebarColumn = (
    <>
      <Gallery photos={employee.photos} />
      <AddressCard />
    </>
  );

  const contentColumn = (
    <>
      <div className="text-2xl font-extrabold my-5">Meine Events</div>

      {events && events.data ? (
        <>
          <div className="flex flex-wrap -mx-3">
            {events.data &&
              events.data.map(event => (
                <EventCard
                  className="w-full md:w-1/2 lg:w-1/3"
                  href={`/employees/${id}/events`}
                  key={event.id}
                  {...event}
                ></EventCard>
              ))}
          </div>

          <Pagination
            page={page}
            setPage={setPage}
            {...events.paginatorInfo}
          ></Pagination>
        </>
      ) : (
        <div>Loading...</div>
      )}
    </>
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

Events.getInitialProps = async context => {
  const { loggedInUser } = await checkLoggedIn(context.apolloClient);
  if (!loggedInUser) {
    return {};
  }
  return { loggedInUser };
};

export default Events;
