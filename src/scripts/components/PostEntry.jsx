'use strict';
var React = require('react');

var PostEntry = React.createClass({
	render: function() {
		return (
			<div className="well">
  				<form>
  					<div className="form-group">
  						<input type="text" className="form-control" id="postEntryTitle" placeholder="Post Title" />
  					</div>	

  					<div className="form-group">
  						<textarea className="form-control" rows="3" id="postEntryBody" placeholder="Post Body"></textarea>
  					</div>

  					<button type="submit" className="btn btn-primary">Submit</button>
  				</form>
			</div>
		);
	}
});

module.exports = PostEntry;
