import React from "react";
import cookie from "cookie";
import {useApolloClient} from "@apollo/react-hooks";

import { Header } from 'UI';
import GirlsBox from "components/homepage/GirlsBox";

import redirect from "lib/redirect";
// import checkLoggedIn from "lib/checkLoggedIn";

const Index = ({loggedInUser}) => {
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
            <Header/>
            <main className="relative z-10 mt-12 xl:mt-22-5">
                <div className="container">
                    <div className="flex text-black items-end leading-none text-black md:text-white">
                        <div className="text-4xl font-extrabold tracking-tighter">Girls
                        </div>
                    </div>
                    <GirlsBox />
                </div>
            </main>
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
