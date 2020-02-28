import React, {useState} from "react";
import redirect from "lib/redirect";
import {useRouter} from "next/router";
import checkLoggedIn from "lib/checkLoggedIn";
import {getLayout} from "components/account/AccountLayout";
import {useQuery, useMutation} from "@apollo/react-hooks";
import {GET_CLUB, DELETE_EVENT} from "queries";
import {Button, DeletePopup, Loader} from "UI";
import Link from "next/link";
import {useTranslation} from "react-i18next";

const EventCard = ({event, removeEvent}) => {
    const {query: {cid}} = useRouter();
    const {t, i18n} = useTranslation();
    const [deleteEvent] = useMutation(DELETE_EVENT, {
        // update(
        //     cache,
        //     {
        //         data: {deleteEvent}
        //     }
        // ) {
        //     const {club} = cache.readQuery({
        //         query: GET_CLUB,
        //         variables: {
        //             id: event.club.id
        //         }
        //     });
        //
        //     let events = club.events;
        //     // deleteEvent.message = event.id
        //     events = events.filter(e => e.id !== deleteEvent.message);
        //
        //     cache.writeQuery({
        //         query: GET_CLUB,
        //         variables: {
        //             id: event.club.id
        //         },
        //         data: {
        //             club: {
        //                 ...club,
        //                 events
        //             }
        //         }
        //     });
        // },
        // refetchQueries: () => [
        //     {
        //         query: GET_CLUB,
        //         variables: {
        //             id: cid
        //         },
        //     },
            // {
            //     query: GET_MY_EMPLOYEE_EVENTS_COUNT,
            // }
        // ]
    });

    const handleDelete = () => {
        try {
            deleteEvent({
                variables: {
                    event: event.id
                }
            })
              .then(() => {
                  removeEvent(event.id)
              });
        } catch (e) {
            return {
                status: false,
                message: "Server error"
            };
        }
    };

    return (
        <div className="px-3 w-full md:w-1/2 mb-5">
            <div className="p-5 border-light-grey border rounded-lg shadow h-full">
                <div className="truncate">
                    {event.title}
                </div>
                <div className="capitalize text-grey">
                    {event.type && event.type.display_name}
                </div>

                <div className="flex flex-wrap justify-end -mx-2">
                    <div className="px-2">
                        <Link href={`/account/club/${cid}/events/${event.id}`}>
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
        </div>
    )
};

const EventList = ({events, club, removeEvent}) => {
    const {t, i18n} = useTranslation();

    return (
        <>
            <h3 className="text-3xl font-extrabold tracking-tighter leading-none mb-5">
                {t('account.events_in')} {club.name}
            </h3>

            <Link href={`/account/club/${club.id}/events/create`}>
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

            <div className="flex flex-wrap mt-5 -ml-3">
                {events.map(e => <EventCard key={e.id} event={e} removeEvent={removeEvent}/>)}
            </div>
        </>
    )
};

const AccountClubEvents = ({user}) => {
    const {query: {cid}} = useRouter();
    const {data: {club} = {}, loading} = useQuery(GET_CLUB, {
        fetchPolicy: 'no-cache',
        variables: {
            id: cid
        }
    });

    const [events, setEvents] = useState(null);

    if (loading) {
        return <Loader/>;
    }

    if (events === null) {
        setEvents(club.events);
    }

    const removeEvent = eventId => {
        const eventIndex = events.findIndex(e => parseInt(e.id) === parseInt(eventId));
        events.splice(eventIndex, 1);

        setEvents([...events]);
    };

    return (<EventList events={events || []} club={club} removeEvent={removeEvent}/>);
};

AccountClubEvents.getInitialProps = async ctx => {
    const {loggedInUser: user} = await checkLoggedIn(ctx.apolloClient);
    if (!user) {
        redirect(ctx, "/login");
    }

    return {user};
};

AccountClubEvents.getLayout = getLayout;

export default AccountClubEvents;
