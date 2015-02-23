var React = require('react/addons');


// Renders the todo list as well as the toggle all button
// Used in TodoApp
var SinglePost =  React.createClass({
    render: function() {       
        return (
            <div className="panel panel-default">
                <div className="panel-heading">
                    <div className="row">
                        <div className="col-xs-8">
                            <h3 className="panel-title">{ this.props.post.title }</h3>
                        </div>
                        <div className="col-xs-4 text-right">
                            <button type="button" class="btn btn-default"><i className="fa fa-external-link"></i></button>
                            <button type="button" class="btn btn-default"><i className="fa fa-trash-o"></i></button>
                        </div>
                    </div>
                </div>
                <div className="panel-body" dangerouslySetInnerHTML={{__html: this.props.post.content }}>
                </div>
            </div>
        );
    }
});

module.exports = SinglePost;