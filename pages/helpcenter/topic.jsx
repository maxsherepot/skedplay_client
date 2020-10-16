import HelpCenter from "components/helpCenter/HelpCenter";

import {useRouter} from "next/router";
import checkLoggedIn from "lib/checkLoggedIn";
import {Router} from 'lib/i18n';

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