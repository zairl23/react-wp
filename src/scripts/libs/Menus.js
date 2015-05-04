'use strict';
var React = require('react');

var Menu = React.createClass({

	render: function() {
		<nav>
			<ul className="nav nav-pills pull-right">
				<li role="presentation" className="active"><a href={this.props.info.url}>Home</a></li>
				<li role="presentation"><a href="#">About</a></li>
				<li role="presentation"><a href="#">Contact</a></li>
			</ul>
	        	</nav>
	}
});