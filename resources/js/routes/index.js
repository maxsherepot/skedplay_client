import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';

import routes from './routes';

const Routes = () => (
  <Router>
    <Switch>
      {routes.map(({ component: Component, ...rest }, i) => {
        return <Route {...rest} render={props => <Component {...props} />} />;
      })}
    </Switch>
  </Router>
);

export default Routes;
