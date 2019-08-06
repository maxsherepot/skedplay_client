import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

const Home = lazy(() => import('@/pages/home'));

const Routes = () => (
  <Router>
    <Suspense fallback={<div>Загрузка...</div>}>
      <Switch>
        <Route exact path="/" component={Home} />
      </Switch>
    </Suspense>
  </Router>
);

export default Routes;
