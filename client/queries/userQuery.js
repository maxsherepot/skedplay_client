import gql from "graphql-tag";

export const GET_ME = gql`
    query me {
        me {
            id
            name
            phone
            email
            age
            is_client
            is_club_owner
            is_employee
            is_manager
            is_admin
            is_client_chat_member
            favorites_count
            employees_photos
            employees_videos
            verify_photo {
                id 
                name
                url
                thumb_url
            }
            avatar {
                id 
                name
                url
                thumb_url
            }
#            employees_events
            unread_messages_count
            status
            rejected_reason
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
                photos {
                    id
                    url
                    thumb_url
                }
                schedule {
                    id
                    day
                    day_name
                    start
                    end
                    order
                    available
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
                address
                website
                reviews {
                    id
                }
            }
        }
    }
`;

export const UPLOAD_USER_AVATAR = gql `
    mutation uploadUserAvatar(
        $avatar: Upload!
        $collection: String!
    ) {
        uploadUserAvatar(
            avatar: $avatar
            collection: $collection
        ) { 
            status
            message
        }
    }
`;

export const UPLOAD_VERIFY_PHOTO = gql `
    mutation uploadUserVerifyPhoto(
        $verify_photo: Upload!
        $collection: String!
    ) {
        uploadUserVerifyPhoto(
            verify_photo: $verify_photo
            collection: $collection
        ) {
            status
            message
        }
    }
`;

export const GET_MY_EMPLOYEE_EVENTS_COUNT = gql`
    query me {
        me {
            id
            employees_events
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

export const MY_EVENTS_COUNT_FRAGMENT = gql`
    fragment myEventsCount on me {
        employees_events
    }
`;
