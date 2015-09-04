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
var _development = null;
var _selectedblock = null;
var _apartments = {};
var _matches = [];
var _apartment = null;
var _matchstr = null;
var _selectedoccupancy = null;
var _mobile = "";
var _email = "";

var _occupancies = [
  {id:"owner", name:"owner"},
  {id:"tenant", name:"tenant"},
  {id:"owneroccupant", name:"own and occupy"},
];

var _updateMobile = function (mobile){
  _mobile = mobile;
};

var _updateEmail = function (email){
  _email = email;
};

var _findMatches = function(str){

  if (!str && !_matchstr){
    _matches = [];
    return;
  }

  str = str || _matchstr;
  
  _matchstr = str;

  _matches = [];

  if (_selectedblock && _selectedblock.blockId) 
      _matches = _apartments[_selectedblock.blockId] || [];
  

  _matches = _matches.filter(function(apartment){
    return apartment.name.toLowerCase().indexOf(str.toLowerCase()) > -1;
  });
};

var _selectOccupancy = function(occupancy){
  _selectedoccupancy = occupancy;
};

var _selectApartment = function(apartment){
  _apartment = apartment;
};

var _unselectApartment = function(){
  _apartment = null;
};

var _selectApartmentByName = function(name){
  if (_selectedblock && _selectedblock.blockId){ 
      _apartment = _apartments[_selectedblock.blockId].filter(function(apartment){
        return apartment.name.toLowerCase() === name.toLowerCase().trim();
      }).reduce(function(acc, obj){
        return obj;
      },null);
  }
};

var _setDevelopment = function(development){
  _development = development;
  
  _apartments = _development.blocks.reduce(function(acc, block){
    acc[block.blockId] = block.apartments;
    return acc;
  }, {});
};


var _selectBlock = function(block){
  _selectedblock = block;
};

var DevelopmentStore = assign({}, EventEmitter.prototype, {

  selectedblock: function(){
    return _selectedblock;
  },

  development: function(){
    return _development;
  },

  matches: function(nomorethan){
    if (nomorethan && _matches.length > nomorethan)
        return [];
    return _matches;
  },

  apartment: function(){
    return _apartment;
  },

  occupancies: function(){
    return _occupancies;
  },

  selectedoccupancy: function(){
    return _selectedoccupancy;
  },

  mobile: function(){
    return _mobile;
  },

  email: function(){
    return _email;
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
    _selectBlock(action.action.block);
    _findMatches();
    _unselectApartment();
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

  case ActionTypes.APARTMENT_SELECTED_BY_NAME:
    _selectApartmentByName(action.action.name);
    DevelopmentStore.emitChange();
    break;

  case ActionTypes.OCCUPANCY_SELECTED:
    _selectOccupancy(action.action.occupancy);
    DevelopmentStore.emitChange();
    break;

  case ActionTypes.MOBILE_UPDATED:
    
    _updateMobile(action.action.mobile);
    DevelopmentStore.emitChange();
    break;

  case ActionTypes.EMAIL_UPDATED:

    _updateEmail(action.action.email);
    DevelopmentStore.emitChange();
    break;

  default:
      // no op
  }
});

module.exports = DevelopmentStore;
