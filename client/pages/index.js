import React from "react";
import cookie from "cookie";
import {useApolloClient} from "@apollo/react-hooks";

import {Header} from 'UI';

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
            <div className="animation-gradient absolute top-0 left-0 w-full h-screen">
                <img className="hidden md:block animation-background__angle mb-0" src="/static/img/angle.svg"/>
                <img className="hidden lg:block absolute top-0 right-0" src="/static/img/snake.svg"/>
            </div>
            <Header/>
            <main className="relative h-screen z-10 mt-12 xl:mt-22-5">
                <div className="container mx-auto">
                    <div className="flex text-black items-end leading-none text-black md:text-white">
                        <div className="text-4xl font-extrabold tracking-tighter">Girls
                        </div>
                    </div>
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
