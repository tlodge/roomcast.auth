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
var _resetmessage  = "";
var _forgotten = false;

var _seterror = function(message){
  _message = message;
};

var _toggle_forgotten = function(){
  _forgotten = !_forgotten;
  _resetmessage = "";
};

var _set_reset_message = function(message){
  _resetmessage = message;
  _forgotten = false;
}

var AuthenticationStore = assign({}, EventEmitter.prototype, {

  resetmessage: function(){
    return _resetmessage;
  },

  forgotten: function(){
    return _forgotten;
  },

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
      _seterror(action.action.message);
      AuthenticationStore.emitChange();
      break;
    
    case ActionTypes.TOGGLE_FORGOTTEN:
      _toggle_forgotten();
      AuthenticationStore.emitChange();
      break;

    case ActionTypes.RESET_COMPLETE:
      _set_reset_message(action.action.message);
      AuthenticationStore.emitChange();
      break;

    default:
      // no op
  }
});

module.exports = AuthenticationStore;
