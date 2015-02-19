var _ = require('underscore');
var React = require('react/addons');
var ReactRouter = require('react-router');
var BackboneReactComponent = require('backbone-react-component');

var SinglePost = require('./SinglePost.jsx');


// Renders the todo list as well as the toggle all button
// Used in TodoApp
var PostList = React.createClass({
    mixins: [BackboneReactComponent],
    componentDidMount: function() {
        this.getCollection().fetch();
    },
    createEntry: function(model) {
        return (
            <SinglePost key={model.get('ID')} post={model} />
        );
    },
    render: function() {            
        return (
            <div>{this.getCollection().map(this.createEntry)}</div>
        );
    }
});


module.exports = PostList;