import React from "react";
import redirect from "lib/redirect";
import {useRouter} from "next/router";
import checkLoggedIn from "lib/checkLoggedIn";
import {getLayout} from "components/account/AccountLayout";
import {useQuery, useMutation} from "@apollo/react-hooks";
import {GET_CLUB, DELETE_EVENT} from "queries";
import {Button, DeletePopup, Loader} from "UI";
import Link from "next/link";
import {useTranslation} from "react-i18next";

const EventCard = ({event}) => {
    const {query: {cid}} = useRouter();
    const {t, i18n} = useTranslation();
    const [deleteEvent] = useMutation(DELETE_EVENT, {
        update(
            cache,
            {
                data: {deleteEvent}
            }
        ) {
            const {club} = cache.readQuery({
                query: GET_CLUB,
                variables: {
                    id: event.club.id
                }
            });

            let events = club.events;
            // deleteEvent.message = event.id
            events = events.filter(e => e.id !== deleteEvent.message);

            cache.writeQuery({
                query: GET_CLUB,
                variables: {
                    id: event.club.id
                },
                data: {
                    club: {
                        ...club,
                        events
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
            <div className="flex flex-wrap">
                {events.map(e => <EventCard key={e.id} event={e}/>)}
            </div>
        </>
    )
};

const AccountClubEvents = ({user}) => {
    const {query: {cid}} = useRouter();
    const {data: {club} = {}, loading} = useQuery(GET_CLUB, {
        variables: {
            id: cid
        }
    });

    if (loading) {
        return <Loader/>;
    }

    return (<EventList events={club.events}/>);
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
