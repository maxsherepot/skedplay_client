import { CREATE_CLUB } from "queries";
import NewClubForm from "./NewClubForm";
import { useMutation } from "@apollo/react-hooks";
import ym from "react-yandex-metrika";

const NewClubBox = () => {
  const onCompleted = () => {
    if (process.env.ANALYTICS_SCRIPTS === 'true') {
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}

      gtag('event', 'create_club', {'event_category' : 'click'});
      ym('reachGoal', 'create_club');
    }

    document.location.href = "/account";
  };

  const [createClub] = useMutation(CREATE_CLUB, {
    onCompleted
  });
  return <NewClubForm onSubmit={createClub} />;
};

export default NewClubBox;
