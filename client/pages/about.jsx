import {Footer} from "UI";

import checkLoggedIn from "lib/checkLoggedIn";

import About from 'components/about';

const AboutPage = ({ user }) => {
  return (
    <>
      <About user={user}/>
      <Footer user={user}/>
    </>
  );
};

AboutPage.getInitialProps = async ctx => {
  const {loggedInUser: user} = await checkLoggedIn(ctx.apolloClient);

  if (!user) {
    return [];
  }
  return {user};
};

AboutPage.getLayout = (page) => page;

export default AboutPage;
