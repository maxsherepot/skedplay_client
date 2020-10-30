import React, {useState, useMemo} from "react";
import redirect from "lib/redirect";
import checkLoggedIn from "lib/checkLoggedIn";
import {getLayout} from "components/account/AccountLayout";
import {Button, DeletePopup, Loader} from "UI";
import {
    DELETE_EVENT,
    EVENTS_BY_OWNER,
    GET_ME,
    EVENT_TYPES,
    GET_MY_EMPLOYEE_EVENTS_COUNT,
} from "queries";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import Add from "@material-ui/icons/Add";
import {useApolloClient, useMutation, useQuery} from "@apollo/react-hooks";
import Link from 'components/SlashedLink'
import {useTranslation} from "react-i18next";
import EventLabel from "UI/EventCard/EventLabel";

const AccountEventsIndex = ({user}) => {
    const {data: {eventsByOwner} = {}, loading} = useQuery(EVENTS_BY_OWNER, {
        fetchPolicy: 'no-cache',
        variables: {
            owner_id: user.id,
            owner_type: "user"
        }
    });


    const {t, i18n} = useTranslation();

    if (loading) {
        return <Loader/>;
    }

    const EventCard = ({event}) => {
        const [deleteEvent] = useMutation(DELETE_EVENT, {
            // update( // TODO из-за бага apollo - cache.writeQuery не пашет
            //     cache,
            //     {
            //         data: {deleteEvent}
            //     }
            // ) {
            //     const {eventsByOwner} = cache.readQuery({
            //         query: EVENTS_BY_OWNER,
            //         variables: {
            //             owner_id: user.employee.id,
            //             owner_type: "employee",
            //         }
            //     });
            //
            //     const events = eventsByOwner
            //       .filter(e => parseInt(e.id) !== parseInt(deleteEvent.message));
            //
            //     cache.writeQuery({
            //         query: EVENTS_BY_OWNER,
            //         data: {
            //             eventsByOwner: [...events]
            //         }
            //     });
            //
            //     cache.writeFragment({
            //         fragment: MY_EVENTS_COUNT_FRAGMENT,
            //         data: {
            //             employees_events: events.length,
            //             __typename: 'me'
            //         },
            //     });
            // },
            refetchQueries: [
                {
                    query: EVENTS_BY_OWNER,
                    variables: {
                        owner_id: user.id,
                        owner_type: "user"
                    }
                },
                {
                    query: GET_MY_EMPLOYEE_EVENTS_COUNT,
                }
            ]
        });

        const handleDelete = () => {
            try {
                deleteEvent({
                    variables: {
                        event: event.id
                    }
                });
            } catch (e) {
                return {
                    status: false,
                    message: t('errors.server_error')
                };
            }
        };

        return (
            <div className="px-3 w-full mb-5">
                <div className="p-5 border-light-grey border rounded-lg shadow h-full row flex flex-wrap">
                    <div className="relative inline-block flex justify-center sm:block mb-6 sm:mb-0 w-full sm:w-1/3">
                        <div className="rounded-lg relative">
                            <div className="event-photo__div" style={{backgroundSize: "cover", backgroundImage: "url(" + (event.mainPhoto && event.mainPhoto.url || '/static/img/event-none.png') + ")"}} ></div>
                                <div className="absolute bottom-0 w-full flex justify-center sm:justify-start left-0 p-4 text-2xl font-black text-white z-30">
                                    <div className="flex flex-wrap -mx-3">
                                        <div className="px-2 ">
                                            <EventLabel type={event.type} />
                                        </div>
                                    </div>
                                </div>
                        </div>

                    </div>
                    <div className="relative inline-block sm:pl-6 w-full sm:w-2/3 flex-column event-photo__div-info">
                        <div className="mb-2">
                            <div className="top-0 font-bold">
                                {event.title}
                            </div>
                            <div className="mt-1">
                                {event.description}
                            </div>
                        </div>
                        <div className="flex flex-wrap">
                            <div className="pr-2">
                                <Link href={`/account/events/eid?eid=${event.id}`} as={`/account/events/${event.id}`}>
                                    <a>
                                        <Button className="px-2" level="secondary" outline size="xxs">
                                            {t('common.edit')}
                                        </Button>
                                    </a>
                                </Link>
                            </div>
                            <div className="px-2">
                                <DeletePopup onEnter={handleDelete} title={`${t('act.delete')} ${event.title}?`}>
                                    <div className="pt-6">
                                        <p>{t('account.are_you_sure_delete_event')}</p>
                                    </div>
                                </DeletePopup>
                            </div>
                        </div>

                    </div>

                    {/*<div className="capitalize text-grey">*/}
                    {/*    {event.type && event.type.name}*/}
                    {/*</div>*/}
                </div>
            </div>
        )
    };

    const EventList = ({events}) => {
        const [tab, setTab] = useState(0);
        const {data: {event_types: eventTypes} = {}, eventTypesLoading} = useQuery(EVENT_TYPES);
        const {t, i18n} = useTranslation();

        const tabSelected = tab > 0 ? eventTypes[tab - 1] : {}

        const eventsFiltered = useMemo(() => events.filter((v) => tabSelected.id ? v.type.id === tabSelected.id : true), [tab, events.length])

        return (
            <>
                <div className="flex items-center justify-between sm:-mt-4 scale">
                    <div className="text-2xl font-bold tracking-tighter leading-none">
                        {t('account.events')}
                    </div>
                    <Link href={`/account/events/create`}>
                        <a>
                            <Button
                                className="px-4 flex items-center"
                                size="sm"
                                type="button"
                            >
                                <Add className="mr-1"/>{t('layout.add_new_event')}
                            </Button>
                        </a>
                    </Link>
                </div>

                <div className="flex border-b mt-4 mb-8 " style={{borderColor: "#eee"}}>
                    <Tabs
                      value={tab}
                      variant="scrollable"
                      scrollButtons="off"
                      className="tabs-normal"
                      disableRipple
                      onChange={(e, v) => setTab(v)}
                      aria-label="scrollable prevent tabs example"
                    >
                        {
                            [{name: "All"}].concat(eventTypes || []).map((tab, i) => {
                                return (
                                    <Tab className="outline-none" label={tab.name}/>
                                )
                            })
                        }
                    </Tabs>
                </div>

                <div className="flex flex-wrap mt-5 -mx-3 scale">
                    {eventsFiltered.map(e =>
                        <EventCard
                        key={e.id} event={e}/>)}

                    {eventsFiltered.length === 0 && <div className="w-full mt-8 text-grey text-md text-center flex justify-center" style={{minHeight: 300}}>No Events. Create One</div>}
                </div>
            </>
        )
    };

    return (
        <>
            <EventList events={eventsByOwner}/>
        </>
    );
};

AccountEventsIndex.getInitialProps = async ctx => {
    const {loggedInUser: user} = await checkLoggedIn(ctx.apolloClient);
    if (!user) {
        redirect(ctx, "/login");
    }

    return {user};
};

AccountEventsIndex.getLayout = getLayout;

export default AccountEventsIndex;
