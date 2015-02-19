'use strict';
var React = require('react');
var App   = require('./components/App.jsx');

var Posts = require('./collections/WpApiCollections').Posts;

React.render(<App collection={new Posts()} />, document.body);