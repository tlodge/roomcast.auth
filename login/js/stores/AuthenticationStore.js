/*
 * Copyright (c) 2015, Tom Lodge
 * All rights reserved.
 *
 * AuthenticationStore
 */

var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var AuthConstants = require('../constants/AuthConstants');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';
var ActionTypes = AuthConstants.ActionTypes;
var _loggedIn = false;

var AuthenticationStore = assign({}, EventEmitter.prototype, {

  loggedIn: function() {
    return _loggedIn;
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  /**
   * @param {function} callback
   */
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  /**
   * @param {function} callback
   */
  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
});

// Register callback to handle all updates
AuthenticationStore.dispatchToken = AppDispatcher.register(function(action) {

  switch(action.action.type) {

  case ActionTypes.RAW_LOGIN:
    _loggedIn = true;
    AuthenticationStore.emitChange();
    break;

    default:
      // no op
  }
});

module.exports = AuthenticationStore;
