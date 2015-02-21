var React = require('react/addons');


// Renders the todo list as well as the toggle all button
// Used in TodoApp
var SinglePost =  React.createClass({
    render: function() {       
        return (
            <div className="panel panel-default">
                <div className="panel-heading">
                    <h3 className="panel-title">{ this.props.post.title }</h3>
                </div>
                <div className="panel-body" dangerouslySetInnerHTML={{__html: this.props.post.content }}>
                </div>
            </div>
        );
    }
});

module.exports = SinglePost;