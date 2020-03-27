import gql from "graphql-tag";

export const ALL_EVENTS = gql`
    query allEvents($first: Int!, $page: Int!, $filters: EventFilters) {
        events(first: $first, page: $page, filters: $filters) {
            data {
                id
                title
                address
                lat
                lng
                price
                start_date
                end_date
                start_time
                favorited {
                    id
                }
                club {
                    name
                    address
                    lat
                    lng
                    services {
                        id
                        name
                        pivot {
                            price
                        }
                    }
                }
                type {
                    id
                    name
                }
                photos {
                    url
                }
            }
            paginatorInfo {
                count
                currentPage
                firstItem
                hasMorePages
                lastItem
                lastPage
                perPage
                total
            }
        }
    }
`;

export const EVENTS_BY_OWNER = gql`
    query eventsByOwner($owner_id: ID!, $owner_type: String!) {
        eventsByOwner(owner_id: $owner_id, owner_type: $owner_type) {
            id
            title
            address
            lat
            lng
            price
            favorited {
                id
            }
            club {
                name
                address
                lat
                lng
                services {
                    id
                    name
                    pivot {
                        price
                    }
                }
            }
            type {
                id
                name
            }
            photos {
                url
            }
        }
    }
`;

export const GET_EVENT = gql`
    query getEvent($id: ID!) {
        event(id: $id) {
            id
            title
            description
            mode
            address
            lat
            lng
            price
            employees {
                id
                name
                isVip
                photos {
                    url
                    thumb_url
                }
            }
            days
            start_date
            end_date
            start_time
            favorited {
                id
            }
            club {
                name
                address
                lat
                lng
                services {
                    id
                    name
                    pivot {
                        price
                    }
                }
                employees {
                    id
                    name
                    isVip
                    photos {
                        url
                        thumb_url
                    }
                }
            }
            type {
                id
                name
            }
            photos {
                id
                url
                thumb_url
            }
        }
    }
`;

export const CREATE_CLUB_EVENT = gql`
    mutation createClubEvent($club: ID!, $input: EventInput) {
        createClubEvent(club: $club, input: $input) {
            id
            title
        }
    }
`;

export const UPDATE_CLUB_EVENT = gql`
    mutation updateClubEvent($event: ID!, $input: EventUpdateInput) {
        updateClubEvent(event: $event, input: $input) {
            status
            message
        }
    }
`;

export const UPDATE_EVENT = gql`
    mutation updateEvent($event: ID!, $input: EventUpdateInput) {
        updateEvent(event: $event, input: $input) {
            status
            message
        }
    }
`;

export const DELETE_EVENT = gql`
    mutation deleteEvent($event: ID!) {
        deleteEvent(event: $event) {
            status
            message
        }
    }
`;