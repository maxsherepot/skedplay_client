import gql from "graphql-tag";

export const INDEX_PAGE_DATA = gql `
    query indexPageData {
        page(key: "index") {
            id
            key
            title
            header
            description
            keywords
        }

        events(first: 5, filters: {status: 1, user_status: 1}) {
            data {
                id
                title
                short_title
                city {
                    id
                    name
                    slug
                    canton {
                        id
                        name
                        slug
                    }
                }
                status
                user_status
                photos {
                    id
                    thumb_url
                }
                type {
                    id
                    name
                }
                club {
                    address
                    city {
                        id
                        name
                        slug
                        canton {
                            id
                            name
                            slug
                        }
                    }
                }
            }
        }

        clubs(first: 15, filters: {status: 1, user_status: 1}) {
            data {
                id
                name
                city {
                    id
                    name
                    slug
                    canton {
                        id
                        name
                        slug
                    }
                }
                address
                lat
                lng
                status
                user_status
                phones
                employees {
                    id
                    name
                    isNew
                    inGeneral
                    favorited {
                        id
                    }
                    owner {
                        ... on Club {
                            id
                            name
                        }
                    }
                }
                favorited {
                    id
                }
                type {
                    id
                    name
                }
                logo {
                    url
                }
                photos {
                    url
                }
            }
        }

        employees(first: 15, filters: {status: 1, user_status: 1}) {
            data {
                id
                name
                age
                type
                address
                isVip
                isNew
                inGeneral
                status
                user_status
                soon
                index
                city {
                    id
                    name
                    slug
                    canton {
                        id
                        name
                        slug
                    }
                }
                photos {
                    id
                    custom_properties
                    thumb_url
                    thumb_blur_url
                }
            }
        }
    }
`;

export const GET_PAGES = gql `
  query pages {
    pages {
      id
      key
      title
      header
      description
      keywords
    }
  }
`;

export const GET_PAGE = gql `
    query page($key: String!) {
        page(key: $key) {
            id
            key
            title
            header
            description
            keywords
        }
    }
`;