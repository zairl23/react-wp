'use strict';
var React = require('react');
var PostActions = require('../actions/PostActions.js');

var PostEntry = React.createClass({
  handleSubmit: function(e) {
    e.preventDefault();
    var title = this.refs.title.getDOMNode().value.trim();
    var content = this.refs.content.getDOMNode().value.trim();

    PostActions.addPost(title, content);
  },
	render: function() {
		return (
			<div className="well">
  				<form className="postEntry" onSubmit={this.handleSubmit}>
  					<div className="form-group">
  						<input type="text" className="form-control" id="postEntryTitle" placeholder="Post Title" ref="title" />
  					</div>	

  					<div className="form-group">
  						<textarea className="form-control" rows="3" id="postEntryBody" placeholder="Post Body" ref="content"></textarea>
  					</div>

  					<button type="submit" className="btn btn-primary" >Submit</button>
  				</form>
			</div>
		);
	}
});

module.exports = PostEntry;
