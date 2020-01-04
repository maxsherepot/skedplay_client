import React from "react";
import PropTypes from "prop-types";
import * as Yup from "yup";

import { TextField, FormGroup } from "UI";

const CheckCodeStep = ({ phone }) => {
  return (
    <>
      <div className="block text-sm text-center leading-normal my-4 px-6">
        A verification code has been sent your phone number
      </div>

      {phone && (
        <div className="block text-xl text-center text-dark-green font-medium">{phone}</div>
      )}

      <TextField
        className="mt-4"
        label="Confirmation code"
        name="code"
        placeholder="Enter code"
      />
    </>
  );
};

CheckCodeStep.propTypes = {
  phone: PropTypes.string
};

CheckCodeStep.validationSchema = Yup.object().shape({
  code: Yup.string().required()
});

export default CheckCodeStep;
