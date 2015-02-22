/* jslint node: true */
/* global WP_API_Settings */
'use strict';
var Reflux      = require('reflux');
var PostActions = require('../actions/PostActions.js');
var WP          = require( 'wordpress-rest-api' );

var wp          = new WP({endpoint: WP_API_Settings.root, username: 'ciarlill', password: 'mypassword'});

var PostStore = Reflux.createStore({
    listenables: [PostActions],
    data: [],
    onAddPost: function(title, content) {
        wp.posts().auth().post({title: title, content_raw: content, status: 'publish'})
            .then(function(res) {
                PostActions.addPost.completed(res);
            })
            .catch(function(err) {
                PostActions.addPost.failed(err);
            });
    },
    onAddPostCompleted: function(res) {
        PostActions.loadPosts();
        console.log("Added post: " + res);
    },
    onAddPostFailed: function(err) {
        console.log(err);
    },
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
