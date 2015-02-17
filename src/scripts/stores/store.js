'use strict';
var _ = require('underscore');
var Reflux = require('reflux');
var Actions = require('../actions/actions.js');

var Store = Reflux.createStore({
    listenables: [Actions]    
});

module.exports = Store;
