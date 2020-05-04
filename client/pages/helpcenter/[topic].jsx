import HelpCenter from "components/helpCenter/HelpCenter";
// import {getLayout} from "components/helpCenter/HelpCenter";
import {useRouter} from "next/router";
import checkLoggedIn from "lib/checkLoggedIn";
import HelpCenterPage from "./index";

const HelpCenterTopic = () => {
  const {query: {topic}} = useRouter();

  return (
    <HelpCenter topicSlug={topic}/>
  );
};

HelpCenterTopic.getInitialProps = async ctx => {
  const { loggedInUser: user } = await checkLoggedIn(ctx.apolloClient);

  if (!user) {
    return {};
  }
  return { user };
};

export default HelpCenterTopic