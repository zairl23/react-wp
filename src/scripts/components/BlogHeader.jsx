'use strict';
var React = require('react');

var BlogHeader = React.createClass({
	render: function() {
		return (
			<nav className="navbar navbar-default">
  				<div className="container-fluid">
    				<div className="navbar-header">
      					<a className="navbar-brand" href="#">ReactWP</a>
    				</div>
  				</div>
			</nav>
		);
	}
});

module.exports = BlogHeader;
