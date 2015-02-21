'use strict';
var React                  = require('react');
var Reflux				   = require('reflux');
var BlogHeader			   = require('./BlogHeader.jsx');
var PostList               = require('./PostList.jsx');
var PostEntry              = require('./PostEntry.jsx');
var PostStore			   = require('../stores/PostStore.js');

// Renders the full application
var App = React.createClass({
    // this will cause setState({list:updatedlist}) whenever the store does trigger(updatedlist)
    mixins: [Reflux.connect(PostStore,"posts")],
    render: function() {
        return (
        	<div id="reactwp">
	        	<BlogHeader />

	        	<div className="container">
	        		<div className="row">
	        			<div className="col-sm-8 col-sm-offset-2">
	        				<PostEntry />
	        			</div>
	        		</div>


	        		<div className="row">
	        			<div className="col-sm-8 col-sm-offset-2">
	            			<PostList posts={this.state.posts} />
	            		</div>
	            	</div>
	            </div>
	        </div>
        );
    }
});

module.exports = App;
