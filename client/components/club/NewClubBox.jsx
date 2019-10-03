import { CREATE_CLUB } from "queries";
import NewClubForm from "./NewClubForm";
import { useMutation } from "@apollo/react-hooks";

const NewClubBox = () => {
  const [createClub] = useMutation(CREATE_CLUB);
  return <NewClubForm onSubmit={createClub} />;
};

export default NewClubBox;
