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
var _message = "";

var _seterror = function(message){
  console.log("set message to");
  _message = message;
  console.log(_message);
};

var AuthenticationStore = assign({}, EventEmitter.prototype, {

  usernameError: function() {
    return _message;
  },

  passwordError: function() {
    return _message;
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

    case ActionTypes.LOGIN_FAILURE:
      console.log("store --- seeen login failure!!");
      _seterror(action.action.message);
      AuthenticationStore.emitChange();
      break;

    default:
      // no op
  }
});

module.exports = AuthenticationStore;
