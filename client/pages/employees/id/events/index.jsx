import {usePagination} from "hooks";
import {useRouter} from "next/router";
import {useQuery} from "@apollo/react-hooks";
import checkLoggedIn from "lib/checkLoggedIn";
import {ALL_EVENTS, GET_EMPLOYEE} from "queries";
import EmployeeBox from "components/employee/EmployeeBox";
import {EventCard, Gallery, Pagination, AddressCard, Loader} from "UI";
import {useTranslation} from "react-i18next";


const EmployeeEvents = ({user}) => {
    const router = useRouter();
    const {id} = router.query;
    const [page, setPage] = usePagination();
    const {t, i18n} = useTranslation();

    const {data: {employee} = {}, loading: employeeLoading} = useQuery(
        GET_EMPLOYEE,
        {
            variables: {
                id
            }
        }
    );

    const {data: {events} = {}, loading: eventsLoading} = useQuery(
        ALL_EVENTS,
        {
            variables: {
                first: 8,
                page
            }
        }
    );

    if (employeeLoading || eventsLoading) {
        return <Loader/>;
    }

    const sidebarColumn = (
        <>
            <Gallery photos={employee.photos}/>
            <AddressCard addressable={employee}/>
        </>
    );

    const contentColumn = (
        <>
            <div className="text-2xl font-extrabold my-5">{t('employees.meine_events')}</div>

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
                            />
                        ))}
                    </div>

                    <Pagination
                        page={page}
                        setPage={setPage}
                        {...events.paginatorInfo}
                    />
                </>
            ) : (
                <div><Loader/></div>
            )}
        </>
    );

    return (
        <EmployeeBox employee={employee} user={user}>
            <div className="flex flex-wrap -mx-3">
                <div className="w-full lg:w-3/12 px-3">
                    <div className="text-2xl font-extrabold my-5">{t('employees.gallery')}</div>
                    {sidebarColumn}
                </div>
                <div className="w-full lg:w-9/12 px-3">{contentColumn}</div>
            </div>
        </EmployeeBox>
    );
};

EmployeeEvents.getInitialProps = async ctx => {
    const {loggedInUser} = await checkLoggedIn(ctx.apolloClient);
    if (!loggedInUser) {
        return {};
    }
    return {loggedInUser};
};

EmployeeEvents.getLayout = (page) => page;

export default EmployeeEvents;