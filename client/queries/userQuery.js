import gql from "graphql-tag";

export const GET_ME = gql`
    query {
        me {
            id
            name
            phone
            email
            is_client
            is_club_owner
            is_employee
            favorites_count
            employees_photos
            employees_videos
            employees_events
            clubs {
                id
                name
                phones
                admin {
                    name
                }
                employees {
                    id
                    name
                }
                events {
                    id
                    title
                    photos {
                        url
                    }
                }
                type {
                    id
                    name
                }
                events_count
                photos_count
                videos_count
            }
            employees {
                id
                name
                events_count
                photos_count
                videos_count
                reviews {
                    id
                }
            }
            employee {
                id
                name
                events_count
                photos_count
                videos_count
                reviews {
                    id
                }
            }
        }
    }
`;

export const FAVORITE_EMPLOYEES = gql`
    query getFavoriteEmployees($id: ID!) {
        favoriteEmployees(id: $id) {
            id
            name
            age
            index
            lat
            lng
            address
            isVip
            isNew
            favorited {
                id
            }
            photos {
                url
                thumb_url
            }
        }
    }
`;

export const FAVORITE_CLUBS = gql`
    query getFavoriteClubs($id: ID!) {
        favoriteClubs(id: $id) {
            id
            name
            address
            lat
            lng
            phones
            favorited {
                id
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

export const FAVORITE_EVENTS = gql`
    query getFavoriteEvents($id: ID!) {
        favoriteEvents(id: $id) {
            id
            title
            favorited {
                id
            }
            club {
                address
                services {
                    id
                    name
                    lat
                    lng
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
