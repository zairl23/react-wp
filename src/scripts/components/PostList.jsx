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
            <div role="tabpanel">
                <ul className="nav nav-tabs" role="tablist">
                  <li role="presentation" className="active"><a href="#">All</a></li>
                  <li role="presentation"><a href="#">Filtered</a></li>
                </ul>
                <div className="tab-content">
                    { this.props.posts.map(this.createEntry) }
                </div>
            </div>
        );
    }
});


module.exports = PostList;