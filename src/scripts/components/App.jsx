'use strict';
var React                  = require('react');
var $                      = require('jquery');
var Backbone               = require('backbone');
Backbone.$                 = $;
var BackboneReactComponent = require('backbone-react-component');

var BlogHeader			   = require('./BlogHeader.jsx');
var PostList               = require('./PostList.jsx');
var PostEntry              = require('./PostEntry.jsx');


// Renders the full application
var App = React.createClass({
    // this will cause setState({list:updatedlist}) whenever the store does trigger(updatedlist)
    mixins: [BackboneReactComponent],			 // [Reflux.connect(Store,"")],
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
	            			<PostList />
	            		</div>
	            	</div>
	            </div>
	        </div>
        );
    }
});

module.exports = App;
