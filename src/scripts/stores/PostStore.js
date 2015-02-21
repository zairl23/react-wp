/* jslint node: true */
'use strict';
var _ = require('underscore');
var Reflux = require('reflux');
var PostActions = require('../actions/PostActions.js');
var WP    = require( 'wordpress-rest-api' );

var wp = new WP({endpoint: WP_API_Settings.root});

var PostStore = Reflux.createStore({
    listenables: [PostActions],
    data: [],
    onLoadPosts: function() {
    	wp.posts()
    		.then(function(data) {
    			PostActions.loadPosts.completed(data);
    		})
    		.catch(function(err) {
    			PostActions.loadPosts.failed(err);
    		});
    },
    onLoadPostsCompleted: function(data) {
		this.trigger(this.data = data);
    },
    onLoadPostsFailed: function(err) {
    	this.trigger(this.data = []);
    },
    getInitialState: function() {
    	return this.data;
    }
});

module.exports = PostStore;
