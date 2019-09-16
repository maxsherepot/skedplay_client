import { useState } from "react";
import { useMutation, useApolloClient } from "@apollo/react-hooks";
import redirect from "lib/redirect";
import cookie from "cookie";

// import {
//   REGISTER_USER,
//   SEND_VERTIFICATION_CODE,
//   CHECK_VERTIFICATION_CODE
// } from "queries";
import { getErrors } from "utils";
import { NewAdForm } from "components/ad";
import { AdInformationStep } from "components/steps";

const NewAdBox = () => {
  //   const [sendCode] = useMutation(SEND_VERTIFICATION_CODE);
  //   const [checkCode] = useMutation(CHECK_VERTIFICATION_CODE);
  //   const [register] = useMutation(REGISTER_USER);

  const onSubmitInformation = async values => {
    try {
      console.log(111);

      //   return {
      //     status,
      //     message
      //   };
    } catch (e) {
      const errors = getErrors(e);

      //   return {
      //     status: false,
      //     message: "Server error",
      //     errors
      //   };
    }
  };

  return (
    <NewAdForm onSubmit={() => console.log("final step")}>
      <NewAdForm.Step
        validationSchema={AdInformationStep.validationSchema}
        onStepSubmit={onSubmitInformation}
      >
        <AdInformationStep />
      </NewAdForm.Step>
    </NewAdForm>
  );
};

export default NewAdBox;
