import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Page extends Component {
  static displayName = 'HomePage';
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
  };

  render() {
    return <div>App</div>;
  }
}

export default Page;
