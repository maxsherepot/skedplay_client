import gql from "graphql-tag";

export const HELP_CENTER_CATEGORIES = gql`
    query helpCenterCategories {
        helpCenterCategories {
            id
            name
            topics {
                id
                slug
                name
                hyphen
                content
                content_html
                title
                description
                keywords
            }
        }
    }
`;