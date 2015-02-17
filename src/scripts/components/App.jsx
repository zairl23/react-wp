'use strict';

var React = require('react');
var Reflux = require('reflux');
var ReactRouter = require('react-router');
var RouteHandler = ReactRouter.RouteHandler;

var Store = require('../stores/store.js');

// Renders the full application
var App = React.createClass({
    // this will cause setState({list:updatedlist}) whenever the store does trigger(updatedlist)
    mixins: [],			 // [Reflux.connect(Store,"")],

    render: function() {
        return;
    }
});

module.exports = App;
