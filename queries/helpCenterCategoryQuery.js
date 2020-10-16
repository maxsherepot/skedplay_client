import gql from "graphql-tag";

export const HELP_CENTER_CATEGORIES = gql`
    query helpCenterCategories {
        helpCenterCategories(active: 1) {
            id
            name
            active
            topics(active: 1) {
                id
                slug
                name
                hyphen
                content
                content_html
                title
                description
                keywords
                active
            }
        }
    }
`;