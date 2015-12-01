import {
  React,
  Router,
  Route,
  IndexRoute,
  history
} from './app';

import Layout from './pages/layout';
import Functions from './pages/lambda_functions';
import Upload from './pages/upload';

const routes = (
  <Router history={history}>
    <Route path='/' component={Layout}>
      <IndexRoute component={Functions} />
      <Route path='upload' component={Upload}/>
    </Route>
  </Router>
);

export default routes;
