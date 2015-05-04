'use strict';
var React = require('react');
var FixedNavbar = require('../libs/FixedNavbar.js');
var NavBar = require('../libs/NavBar.js');

var BlogHeader = React.createClass({
	render: function() {
		return (
			<NavBar info={this.props.info} />
		);
	}
});

module.exports = BlogHeader;
