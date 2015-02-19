'use strict';
var React                  = require('react');
var $                      = require('jquery');
var Backbone               = require('backbone');
Backbone.$                 = $;
var BackboneReactComponent = require('backbone-react-component');

var Posts                  = require('../collections/WpApiCollections').Posts;
var PostList               = require('./PostList.jsx');

// Renders the full application
var App = React.createClass({
    // this will cause setState({list:updatedlist}) whenever the store does trigger(updatedlist)
    mixins: [BackboneReactComponent],			 // [Reflux.connect(Store,"")],
    render: function() {
        return (
            <PostList />
        );
    }
});

module.exports = App;
