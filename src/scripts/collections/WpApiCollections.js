/*jslint node: true */
'use strict';

var Backbone = require('backbone');
var _ 		 = require('underscore');
var WPModels   = require('../models/WpApiModels');

/* global WP_API_Settings:false */
var BaseCollection = Backbone.Collection.extend(
	/** @lends BaseCollection.prototype  */
	{

		/**
		 * Setup default state
		 */
		initialize: function() {
			this.state = {
				data: {},
				currentPage: null,
				totalPages: null,
				totalObjects: null
			};
		},

		/**
		 * Overwrite Backbone.Collection.sync to pagination state based on response headers.
		 *
		 * Set nonce header before every Backbone sync.
		 *
		 * @param {string} method
		 * @param {Backbone.Model} model
		 * @param {{success}, *} options
		 * @returns {*}
		 */
		sync: function( method, model, options ) {
			options = options || {};
			var beforeSend = options.beforeSend;

			if ( typeof WP_API_Settings.nonce !== 'undefined' ) {
				options.beforeSend = function( xhr ) {
					xhr.setRequestHeader( 'X-WP-Nonce', WP_API_Settings.nonce );

					if ( beforeSend ) {
						return beforeSend.apply( this, arguments );
					}
				};
			}

			if ( 'read' === method ) {
				var SELF = this;

				if ( options.data ) {
					SELF.state.data = _.clone( options.data );

					delete SELF.state.data.page;
				} else {
					SELF.state.data = options.data = {};
				}

				if ( typeof options.data.page === 'undefined' ) {
					SELF.state.currentPage = null;
					SELF.state.totalPages = null;
					SELF.state.totalObjects = null;
				} else {
					SELF.state.currentPage = options.data.page - 1;
				}

				var success = options.success;
				options.success = function( data, textStatus, request ) {
					SELF.state.totalPages = parseInt( request.getResponseHeader( 'X-WP-TotalPages' ), 10 );
					SELF.state.totalObjects = parseInt( request.getResponseHeader( 'X-WP-Total' ), 10 );

					if ( SELF.state.currentPage === null ) {
						SELF.state.currentPage = 1;
					} else {
						SELF.state.currentPage++;
					}

					if ( success ) {
						return success.apply( this, arguments );
					}
				};
			}

			return Backbone.sync( method, model, options );
		},

		/**
		 * Fetches the next page of objects if a new page exists
		 *
		 * @param {data: {page}} options
		 * @returns {*}
		 */
		more: function( options ) {
			options = options || {};
			options.data = options.data || {};

			_.extend( options.data, this.state.data );

			if ( typeof options.data.page === 'undefined' ) {
				if ( ! this.hasMore() ) {
					return false;
				}

				if ( this.state.currentPage === null || this.state.currentPage <= 1 ) {
					options.data.page = 2;
				} else {
					options.data.page = this.state.currentPage + 1;
				}
			}

			return this.fetch( options );
		},

		/**
		 * Returns true if there are more pages of objects available
		 *
		 * @returns null|boolean
		 */
		hasMore: function() {
			if ( this.state.totalPages === null ||
				 this.state.totalObjects === null ||
				 this.state.currentPage === null ) {
				return null;
			} else {
				return ( this.state.currentPage < this.state.totalPages );
			}
		}
	}
);

/**
 * Backbone collection for posts
 */
var Posts = BaseCollection.extend(
	/** @lends Posts.prototype */
	{
		url: WP_API_Settings.root + '/posts',

		model: WPModels.Post
	}
);
module.exports.Posts = Posts;

/**
 * Backbone collection for pages
 */
var Pages = BaseCollection.extend(
	/** @lends Pages.prototype */
	{
		url: WP_API_Settings.root + '/pages',

		model: WPModels.Page
	}
);
module.exports.Pages = Pages;

/**
 * Backbone users collection
 */
var Users = BaseCollection.extend(
	/** @lends Users.prototype */
	{
		url: WP_API_Settings.root + '/users',

		model: WPModels.User
	}
);
module.exports.Users = Users;

/**
 * Backbone post statuses collection
 */
var PostStatuses = BaseCollection.extend(
	/** @lends PostStatuses.prototype */
	{
		url: WP_API_Settings.root + '/posts/statuses',

		model: WPModels.PostStatus

	}
);
module.exports.PostStatuses = PostStatuses;

/**
 * Backbone media library collection
 */
var MediaLibrary = BaseCollection.extend(
	/** @lends MediaLibrary.prototype */
	{
		url: WP_API_Settings.root + '/media',

		model: WPModels.Media
	}
);
module.exports.MediaLibrary = MediaLibrary;

/**
 * Backbone taxonomy collection
 */
var Taxonomies = BaseCollection.extend(
	/** @lends Taxonomies.prototype */
	{
		model: WPModels.Taxonomy,

		url: WP_API_Settings.root + '/taxonomies'
	}
);
module.exports.Taxonomies = Taxonomies;

/**
 * Backbone comment collection
 */
var Comments = BaseCollection.extend(
	/** @lends Comments.prototype */
	{
		model: WPModels.Comment,

		post: null,

		/**
		 * @class Represent an array of comments
		 * @augments Backbone.Collection
		 * @constructs
		 */
		initialize: function( models, options ) {
			this.constructor.__super__.initialize.apply( this, arguments );

			if ( options && options.post ) {
				this.post = options.post;
			}
		},

		/**
		 * Return URL for collection
		 *
		 * @returns {string}
		 */
		url: function() {
			return WP_API_Settings.root + '/posts/' + this.post + '/comments';
		}
	}
);
module.exports.Comments = Comments;

/**
 * Backbone post type collection
 */
var PostTypes = BaseCollection.extend(
	/** @lends PostTypes.prototype */
	{
		model: WPModels.PostType,

		url: WP_API_Settings.root + '/posts/types'
	}
);
module.exports.PostTypes = PostTypes;

/**
 * Backbone terms collection
 */
var Terms = BaseCollection.extend(
	/** @lends Terms.prototype */
	{
		model: WPModels.Term,

		type: 'post',

		taxonomy: 'category',

		/**
		 * @class Represent an array of terms
		 * @augments Backbone.Collection
		 * @constructs
		 */
		initialize: function( models, options ) {
			this.constructor.__super__.initialize.apply( this, arguments );

			if ( typeof options !== 'undefined' ) {
				if ( options.type ) {
					this.type = options.type;
				}

				if ( options.taxonomy ) {
					this.taxonomy = options.taxonomy;
				}
			}

			this.on( 'add', _.bind( this.addModel, this ) );
		},

		/**
		 * We need to set the type and taxonomy for each model
		 *
		 * @param {Backbone.model} model
		 */
		addModel: function( model ) {
			model.type = this.type;
			model.taxonomy = this.taxonomy;
		},

		/**
		 * Return URL for collection
		 *
		 * @returns {string}
		 */
		url: function() {
			return WP_API_Settings.root + '/posts/types/' + this.type + '/taxonomies/' + this.taxonomy + '/terms/';
		}
	}
);
module.exports.Terms = Terms;

/**
 * Backbone revisions collection
 */
var Revisions = BaseCollection.extend(
	/** @lends Revisions.prototype */
	{
		model: WPModels.Revision,

		parent: null,

		/**
		 * @class Represent an array of revisions
		 * @augments Backbone.Collection
		 * @constructs
		 */
		initialize: function( models, options ) {
			this.constructor.__super__.initialize.apply( this, arguments );

			if ( options && options.parent ) {
				this.parent = options.parent;
			}
		},

		/**
		 * return URL for collection
		 *
		 * @returns {string}
		 */
		url: function() {
			return WP_API_Settings.root + '/posts/' + this.parent + '/revisions';
		}
	}
);
module.exports.Revisions = Revisions;
