import {GET_ME} from "queries";

export default apolloClient =>
  apolloClient
    .query({
        query: GET_ME
    })
    .then(({ data: { me } }) => {
      return { loggedInUser: me };
    })
    .catch(() => {
      // Fail gracefully
      return { loggedInUser: {} };
    });
