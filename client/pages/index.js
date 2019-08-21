import React from "react";
import cookie from "cookie";
import { useApolloClient } from "@apollo/react-hooks";

import redirect from "lib/redirect";
// import checkLoggedIn from "lib/checkLoggedIn";

const Index = ({ loggedInUser }) => {
  const apolloClient = useApolloClient();

  const signout = () => {
    document.cookie = cookie.serialize("token", "", {
      maxAge: -1 // Expire the cookie immediately
    });

    apolloClient.cache.reset().then(() => {
      redirect({}, "/login");
    });
  };

  return (
    <div>
      Hello {loggedInUser && loggedInUser.me.name}!<br />
      {loggedInUser && <button onClick={signout}>Logout</button>}
    </div>
  );
};

// Index.getInitialProps = async context => {
//   const { loggedInUser } = await checkLoggedIn(context.apolloClient);
//   if (!loggedInUser.me) {
//     redirect(context, "/login");
//   }
//   return { loggedInUser };
// };

export default Index;
