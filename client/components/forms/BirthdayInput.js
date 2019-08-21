import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Field, ErrorMessage } from "formik";

function BirthdayInput() {
  return (
    // Custom logic
    <Fragment>
      <Field type="text" name="birthday" placeholder="Birthday" />
      <ErrorMessage name="birthday" component="div" />
    </Fragment>
  );
}

BirthdayInput.propTypes = {
  key: PropTypes.string
};

export default BirthdayInput;
