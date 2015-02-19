var React = require('react/addons');
var PostModel = require('../models/WpApiModels').Post;
var BackboneReactComponent = require('backbone-react-component');


// Renders the todo list as well as the toggle all button
// Used in TodoApp
var SinglePost =  React.createClass({
    mixins: [BackboneReactComponent],
    render: function() {       
        return (
            <div className="panel panel-default">
                <div className="panel-heading">
                    <h3 className="panel-title">{this.props.post.get('title')}</h3>
                </div>
                <div className="panel-body" dangerouslySetInnerHTML={{__html: this.props.post.get('content')}}>
                </div>
            </div>
        );
    }
});

module.exports = SinglePost;