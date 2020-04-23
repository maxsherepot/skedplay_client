import gql from "graphql-tag";

export const ALL_ADMIN_CHATS = gql`
    query adminChats {
        adminChats {
            id
            user {
                id
                name
            }
            receiver {
                id
                name
            }
            unread_messages_count
            last_message_date
        }
    }
`;


export const MY_ADMIN_CHATS = gql`
    query myAdminChats {
        myAdminChats {
            id
            user {
                id
                name
            }
            last_message {
                id
                text
                from_admin
                created_at
                attachments {
                    id
                    url
                }
            }
        }
    }
`;

export const ADMIN_CHAT_ROOM = gql`
    query adminChat($chatId: Int!) {
        adminChat(chatId: $chatId) {
            id
            user_id
            receiver {
                id
                name
            }
            messages {
                id
                text
                from_admin
                created_at
                attachments {
                    id
                    url
                }
            }
        }
    }
`;

export const SEND_ADMIN_MESSAGE = gql`
    mutation sendAdminMessage($input: AdminMessageInput!) {
        sendAdminMessage(input: $input) {
            id
            chat_id
        }
    }
`;