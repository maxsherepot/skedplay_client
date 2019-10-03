// import {
//   REGISTER_USER,
//   SEND_VERTIFICATION_CODE,
//   CHECK_VERTIFICATION_CODE
// } from "queries";
import NewClubForm from "./NewClubForm";

const NewClubBox = () => {
  //   const [register] = useMutation(REGISTER_USER);
  return <NewClubForm onSubmit={() => console.log("final step")} />;
};

export default NewClubBox;
