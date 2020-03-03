import HelpCenter from "components/helpCenter/HelpCenter";
// import {getLayout} from "components/helpCenter/HelpCenter";
import {useRouter} from "next/router";

const HelpCenterTopic = () => {
  const {query: {topic}} = useRouter();

  return (
    <HelpCenter topicSlug={topic}/>
  );
};

// HelpCenterTopic.getLayout = getLayout;

export default HelpCenterTopic