var _ = require('underscore');
var React = require('react/addons');
var ReactRouter = require('react-router');

var SinglePost = require('./SinglePost.jsx');


// Renders the todo list as well as the toggle all button
// Used in TodoApp
var PostList = React.createClass({
    createEntry: function(model) {
        return (
            <SinglePost key={ /*post id */ } post={ /* post object */} />
        );
    },
    render: function() {            
        return (
            <div>{ /* map each post to createEntry */ }</div>
        );
    }
});


module.exports = PostList;