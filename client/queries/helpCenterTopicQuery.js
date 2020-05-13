import gql from "graphql-tag";

export const HELP_CENTER_TOPICS = gql`    
    query helpCenterTopics {
        helpCenterTopics {
            id
            slug
            name
            title
            description
            keywords
        }
    }
`;

export const HELP_CENTER_TOPIC = gql`
    query helpCenterTopic($slug: String!) {
        helpCenterTopic(slug: $slug) {
            id
            slug
            name
            content
            content_html
            title
            description
            keywords
        }
    }

`;