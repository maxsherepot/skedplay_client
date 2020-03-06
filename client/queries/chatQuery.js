import gql from "graphql-tag";

export const ALL_CHATS = gql `
  query allChats($employeeId: Int) {
    chats(employeeId: $employeeId) {
      id
      employee_id
      client_id
      receiver {
          id
          name
      }
      unread_messages_count
      last_message_date
    }
  }
`;

export const MY_CHATS = gql `
  query myChats {
    myChats {
      id
      employee {
        id
        name
      }
      client {
        id
        name
      }
      last_message {
        id
        text
        from_client
        created_at
        attachments {
            id
            url
        }
      }
    }
  }
`;

export const CHAT_ROOM = gql `
    query chat($chatId: Int!) {
        chat(chatId: $chatId) {
            id
            employee_id
            client_id
            receiver {
                id
                name
            }
            messages {
                id
                text
                from_client
                created_at
                attachments {
                    id
                    url
                }
            }
        }
    }
`;

export const SEND_MESSAGE = gql `
    mutation sendMessage($input: MessageInput!) {
        sendMessage(input: $input) {
            id
            chat_id
        }
    }
`;