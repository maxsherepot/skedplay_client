import HelpCenter from "components/helpCenter/HelpCenter";
// import {getLayout} from "components/helpCenter/HelpCenter";
import {useRouter} from "next/router";
import checkLoggedIn from "lib/checkLoggedIn";
import geoLocatedPage from "../clubs";

const HelpCenterPage = () => {
  return (
    <HelpCenter/>
  );
};

HelpCenterPage.getInitialProps = async ctx => {
  const { loggedInUser: user } = await checkLoggedIn(ctx.apolloClient);

  if (!user) {
    return {};
  }
  return { user };
};

export default HelpCenterPage;