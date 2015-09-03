/*
 * Copyright (c) 2015, Tom Lodge
 * All rights reserved.
 *
 * DevelopmentStore
 */

var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var RegisterConstants = require('../constants/RegisterConstants');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';
var ActionTypes = RegisterConstants.ActionTypes;
var _development = {};
var _selectedblock = null;

var _set_development = function(development){
  _development = development;
};

var _select_block = function(blockId){
  _selectedblock = blockId;
};

var DevelopmentStore = assign({}, EventEmitter.prototype, {

  selectedblock: function(){
    return _selectedblock;
  },

  development: function(){
    return _development;
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
DevelopmentStore.dispatchToken = AppDispatcher.register(function(action) {

  switch(action.action.type) {

  case ActionTypes.RAW_DEVELOPMENT:
    _set_development(action.action.data);
    DevelopmentStore.emitChange();
    break;

  case ActionTypes.BLOCK_SELECTED:
    _select_block(action.action.blockId);
    console.log("seen block selected " + action.action.blockId);
    DevelopmentStore.emitChange();
    break;

  default:
      // no op
  }
});

module.exports = DevelopmentStore;
