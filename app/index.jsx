require('../node_modules/bootstrap/dist/css/bootstrap.min.css');
require('./css/main.css');

import { React, ReactDOM } from './app';
import routes from './routes';

ReactDOM.render(routes, window.document.getElementById('myApp'));
