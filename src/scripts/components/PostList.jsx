var _ = require('underscore');
var React = require('react/addons');
var ReactRouter = require('react-router');

var PostActions = require('../actions/PostActions.js');
var SinglePost = require('./SinglePost.jsx');


// Renders the todo list as well as the toggle all button
// Used in TodoApp
var PostList = React.createClass({
    propTypes: {
        posts: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
    },
    componentWillMount: function() {
        PostActions.loadPosts();
    },
    createEntry: function(post) {
        return (
            <SinglePost key={post.ID} post={post} />
        );
    },
    render: function() {            
        return (
            <div>{ this.props.posts.map(this.createEntry) }</div>
        );
    }
});


module.exports = PostList;