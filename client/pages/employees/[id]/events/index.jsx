import { usePagination } from "hooks";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/react-hooks";
import { ALL_EVENTS } from "queries";
import EmployeeBox from "components/employee/EmployeeBox";
import { EventCard, Pagination } from "UI";

const Employee = ({ loggedInUser }) => {
  const router = useRouter();
  const { id } = router.query;
  const [page, setPage] = usePagination();

  const {
    data: { events },
    loading
  } = useQuery(ALL_EVENTS, {
    variables: {
      first: 8,
      page
    }
  });

  return (
    <EmployeeBox id={id} user={loggedInUser}>
      <div className="text-2xl font-extrabold my-5">Meine Events</div>

      {events && events.data && !loading ? (
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
    </EmployeeBox>
  );
};

// Employee.getInitialProps = async context => {
//   const { loggedInUser } = await checkLoggedIn(context.apolloClient);
//   if (!loggedInUser) {
//     return {};
//   }

//   return { loggedInUser };
// };

export default Employee;
