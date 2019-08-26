import React from "react";
import PropTypes from "prop-types";
import * as Yup from "yup";

import { TextField } from "components/Ui";

const CheckCodeStep = ({ phone, status }) => {
  return (
    <>
      <div className="block text-xs text-center leading-normal my-4 px-6">
        A verification code has been sent your phone number
      </div>

      {phone && (
        <div className="block text-lg text-center font-medium">{phone}</div>
      )}

      <TextField
        className="mt-4"
        label="Confirmation code"
        name="code"
        placeholder="Enter code"
      />

      {status && (
        <FormGroup className="error text-center">
          <span>{status}</span>
        </FormGroup>
      )}
    </>
  );
};

CheckCodeStep.propTypes = {
  phone: PropTypes.string,
  status: PropTypes.string
};

CheckCodeStep.validationSchema = Yup.object().shape({
  code: Yup.string().required()
});

export default CheckCodeStep;
