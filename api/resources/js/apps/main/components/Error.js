import React from 'react';
import PropTypes from 'prop-types';

const Error = ({ error }) => {
  if (error.message) {
    return <div>{error.message}</div>;
  }

  return null;
};

Error.defaultProps = {
  error: {
    message: null,
  },
};

Error.propTypes = {
  error: PropTypes.shape({
    message: PropTypes.string,
  }),
};

export default Error;
