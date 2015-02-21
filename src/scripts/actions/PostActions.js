/* jslint node: true */
'use strict';
var Reflux = require('reflux');

var WP    = require( 'wordpress-rest-api' );

var wp = new WP({endpoint: WP_API_Settings.root});

// Each action is like an event channel for one specific event. Actions are called by components.
// The store is listening to all actions, and the components in turn are listening to the store.
// Thus the flow is: User interaction -> component calls action -> store reacts and triggers -> components update

var PostActions = Reflux.createActions({
	"loadPosts": {asyncResult: true}
});


module.exports = PostActions;
