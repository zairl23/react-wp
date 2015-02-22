/* jslint node: true */
'use strict';
var Reflux = require('reflux');

var PostActions = Reflux.createActions({
	"loadPosts": {asyncResult: true},
	"addPost":   {asyncResult: true}
});


module.exports = PostActions;
