import { Router, Route, Link, IndexRoute } from 'react-router';
import React from 'react';
import ReactDOM from 'react-dom';

const Component = React.Component;
const createHistory = require('history/lib/createHashHistory');
const useQueries = require('history/lib/useQueries');
const history = useQueries(createHistory)();

module.exports = Object.assign(
  {
    React,
    ReactDOM,
    Router, Route, Link, IndexRoute,
    history,
    Component
  }
);
