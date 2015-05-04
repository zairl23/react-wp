'use strict';
var React = require('react');

var NavBar = React.createClass({

	render: function() {
		return (
			<div className="container">
				<div className="header clearfix">
					<nav>
						<ul className="nav nav-pills pull-right">
							<li role="presentation" className="active"><a href={this.props.info.url}>Home</a></li>
							<li role="presentation"><a href="#">About</a></li>
							<li role="presentation"><a href="#">Contact</a></li>
						</ul>
				        	</nav>
					<h3 className="text-muted"><a href={this.props.info.url}>{this.props.info.name}</a></h3>
					<p>{this.props.info.description}</p>
				</div>
			</div>
		);
	}

});

module.exports = NavBar;