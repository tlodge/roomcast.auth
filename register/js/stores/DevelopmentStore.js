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
var _apartments = {};
var _matches = [];
var _apartment = null;
var _matchstr = null;

var _findMatches = function(str){

  if (!str && !_matchstr){
    _matches = [];
    return;
  }

  str = str || _matchstr;
  
  _matchstr = str;

  _matches = [];

  if (_selectedblock) 
      _matches = _apartments[_selectedblock] || [];
  

  _matches = _matches.filter(function(apartment){
    return apartment.name.toLowerCase().indexOf(str.toLowerCase()) > -1;
  });
};

var _selectApartment = function(apartment){
  _apartment = apartment;
};

var _setDevelopment = function(development){
  _development = development;
  
  _apartments = _development.blocks.reduce(function(acc, block){
    acc[block.blockId] = block.apartments;
    return acc;
  }, {});
};


var _selectBlock = function(blockId){
  _selectedblock = blockId;
};

var DevelopmentStore = assign({}, EventEmitter.prototype, {

  selectedblock: function(){
    return _selectedblock;
  },

  development: function(){
    return _development;
  },

  matches: function(nomorethan){
    console.log("matches length is " + _matches.length);
    console.log(_matches);
    
    if (nomorethan && _matches.length > nomorethan)
        return [];
    return _matches;
  },

  apartment: function(){
    return _apartment;
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
    _setDevelopment(action.action.data);
    DevelopmentStore.emitChange();
    break;

  case ActionTypes.BLOCK_SELECTED:
    _selectBlock(action.action.blockId);
    _findMatches();
    DevelopmentStore.emitChange();
    break;

  case ActionTypes.APARTMENT_PARTIAL:
    _findMatches(action.action.partial);
    DevelopmentStore.emitChange();
    break;

  case ActionTypes.APARTMENT_SELECTED:
    _selectApartment(action.action.apartment);
    DevelopmentStore.emitChange();
    break;
  default:
      // no op
  }
});

module.exports = DevelopmentStore;
