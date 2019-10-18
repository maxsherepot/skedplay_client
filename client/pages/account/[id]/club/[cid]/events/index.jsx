import React from "react";
import redirect from "lib/redirect";
import {useRouter} from "next/router";
import checkLoggedIn from "lib/checkLoggedIn";
import {AccountBox} from "components/account";
import {useQuery, useMutation} from "@apollo/react-hooks";
import {GET_CLUB, DELETE_EVENT} from "queries";
import {Button, DeletePopup} from "UI";

const EventCard = ({event}) => {
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
                        <Button className="px-2" level="secondary" outline size="xxs">
                            Edit
                        </Button>
                    </div>
                    <div className="px-2">
                        <DeletePopup onEnter={handleDelete} title={`Delete ${event.title}?`}>
                            <div className="pt-6">
                                <p>Are you sure you want to delete this event?</p>
                            </div>
                        </DeletePopup>
                        {/*<Button className="px-2" level="black" size="xxs">*/}
                        {/*    Delete*/}
                        {/*</Button>*/}
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

const AccountShow = ({loggedInUser}) => {
    const {query: {cid}} = useRouter();
    const {data: {club} = {}, loading} = useQuery(GET_CLUB, {
        variables: {
            id: cid
        }
    });

    if (loading) {
        return <div>Loading...</div>
    }

    return (
        <AccountBox contentClass="lg:w-3/5 px-8 py-12" user={loggedInUser}>
            <EventList events={club.events}/>
        </AccountBox>
    );
};

AccountShow.getInitialProps = async context => {
    const {loggedInUser} = await checkLoggedIn(context.apolloClient);
    if (!loggedInUser) {
        redirect(context, "/login");
    }

    return {loggedInUser};
};

export default AccountShow;
