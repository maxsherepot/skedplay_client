import { CREATE_CLUB } from "queries";
import redirect from "lib/redirect";
import NewClubForm from "./NewClubForm";
import { useMutation } from "@apollo/react-hooks";

const NewClubBox = () => {
  const onCompleted = () => {
    redirect({}, "/account");
  };

  const [createClub] = useMutation(CREATE_CLUB, {
    onCompleted
  });
  return <NewClubForm onSubmit={createClub} />;
};

export default NewClubBox;
