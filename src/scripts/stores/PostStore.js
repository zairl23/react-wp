/* jslint node: true */
'use strict';
var _ = require('underscore');
var Reflux = require('reflux');
var PostActions = require('../actions/PostActions.js');

var PostStore = Reflux.createStore({
    listenables: [PostActions]    
});

module.exports = PostStore;
