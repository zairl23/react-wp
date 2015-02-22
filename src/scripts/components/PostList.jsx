var _           = require('underscore');
var React       = require('react/addons');
var ReactRouter = require('react-router');


var SinglePost  = require('./SinglePost.jsx');

var PostList = React.createClass({
    propTypes: {
        posts: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
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