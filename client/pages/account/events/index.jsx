import React from "react";
import redirect from "lib/redirect";
import checkLoggedIn from "lib/checkLoggedIn";
import {getLayout} from "components/account/AccountLayout";
import {Button, DeletePopup, Loader} from "UI";
import {
    DELETE_EVENT,
    EVENTS_BY_OWNER,
    GET_ME,
    GET_MY_EMPLOYEE_EVENTS_COUNT,
} from "queries";
import {useApolloClient, useMutation, useQuery} from "@apollo/react-hooks";
import { Link } from 'lib/i18n'
import {useTranslation} from "react-i18next";
import EventLabel from "UI/EventCard/EventLabel";

const AccountEventsIndex = ({user}) => {
    const {data: {eventsByOwner} = {}, loading} = useQuery(EVENTS_BY_OWNER, {
        fetchPolicy: 'no-cache',
        variables: {
            owner_id: user.employee.id,
            owner_type: "employee"
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
                        owner_id: user.employee.id,
                        owner_type: "employee"
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
                    <div className="relative inline-block">
                        <div className="rounded-lg">
                            <img className="event-photo__div" src={event.mainPhoto && event.mainPhoto.url || '/static/img/event-none.png'} alt=""/>
                        </div>
                        <div className="absolute bottom-0 left-0 p-4 text-2xl font-black text-white z-30">
                            <div className="flex flex-wrap -mx-3">
                                <div className="px-3">
                                    <EventLabel type={event.type} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="relative inline-block ml-3 w-2/3 flex-column event-photo__div-info">
                        <div className="mb-2">
                            <div className="top-0 font-bold">
                                {event.title}
                            </div>
                            <div className="mt-1">
                                {event.description}
                            </div>
                        </div>
                        <div className="flex flex-wrap">
                            <div className="px-2">
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
        const {t, i18n} = useTranslation();

        return (
            <>
                <Link href={`/account/events/create`}>
                    <a>
                        <Button
                            className="px-3"
                            level="primary-black"
                            outline
                            size="sm"
                            type="button"
                        >
                            {t('layout.add_new_event')}
                        </Button>
                    </a>
                </Link>

                <div className="flex flex-wrap mt-5 -mx-3">
                    {events.map(e =>
                        <EventCard
                        key={e.id} event={e}/>)}
                </div>
            </>
        )
    };

    return (
        <>
            <div className="text-2xl font-extrabold tracking-tighter leading-none mb-5">
                {t('account.events')}
            </div>

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
