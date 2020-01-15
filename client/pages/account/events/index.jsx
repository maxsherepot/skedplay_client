import React from "react";
import redirect from "lib/redirect";
import checkLoggedIn from "lib/checkLoggedIn";
import {getLayout} from "components/account/AccountLayout";
import {Button, DeletePopup} from "UI";
import {
    DELETE_EVENT,
    EVENTS_BY_OWNER,
} from "queries";
import {useMutation, useQuery} from "@apollo/react-hooks";
import Link from "next/link";
import {useTranslation} from "react-i18next";

const AccountEventsIndex = ({user}) => {
    const {data: {eventsByOwner} = {}, loading} = useQuery(EVENTS_BY_OWNER, {
        variables: {
            owner_id: user.id,
            owner_type: "employee"
        }
    });
    const {t, i18n} = useTranslation();


    if (loading) {
        return t('common.loading');
    }

    const EventCard = ({event}) => {
        const [deleteEvent] = useMutation(DELETE_EVENT, {
            update(
                cache,
                {
                    data: {deleteEvent}
                }
            ) {
                const {eventsByOwner} = cache.readQuery({
                    query: EVENTS_BY_OWNER,
                    variables: {
                        owner_id: "6",
                        owner_type: "employee",
                    }
                });

                console.log(eventsByOwner)

                const events = eventsByOwner.filter(e => e.id !== deleteEvent.message);

                cache.writeQuery({
                    query: EVENTS_BY_OWNER,
                    data: {
                        eventsByOwner: {
                            ...events,
                        }
                    }
                });
            }
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
            <div className="px-3 w-full md:w-1/2 mb-5">
                <div className="p-5 border-light-grey border rounded-lg shadow h-full">
                    <div className="truncate">
                        {event.title}
                    </div>

                    <div className="flex flex-wrap justify-end -mx-2">
                        <div className="px-2">
                            <Link href="/account/events/[eid]" as={`/account/events/${event.id}`}>
                                <a>
                                    <Button className="px-2" level="secondary" outline size="xxs">
                                        {t('common.edit')}
                                    </Button>
                                </a>
                            </Link>
                        </div>
                        <div className="px-2">
                            <DeletePopup onEnter={handleDelete} title={`Delete ${event.title}?`}>
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

    const EventList = ({events}) => {
        return (
            <>
                <div className="flex flex-wrap -mx-3">
                    {events.map(e => <EventCard key={e.id} event={e}/>)}
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
