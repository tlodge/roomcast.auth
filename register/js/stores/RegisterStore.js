/*
 * Copyright (c) 2015, Tom Lodge
 * All rights reserved.
 *
 * RegisterStore
 */

var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var RegisterConstants = require('../constants/RegisterConstants');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';
var ActionTypes = RegisterConstants.ActionTypes;

var _details = {};
var _matches = [];
var _matchstr = null;

var _occupancies = [
  {id:"owner", name:"owner"},
  {id:"tenant", name:"tenant"},
  {id:"owneroccupant", name:"own and occupy"},
];

var _setUsername = function(username){
   _details.canchooseusername = (username==="");
   _details.username = username;
};

var _updateUsername = function(username){
  _details.username = username;
};

var _updateFirstname = function(firstname){
  _details.firstname = firstname;
};

var _updateSurname = function(surname){
  _details.surname = surname;
};

var _updateMobile = function (mobile){
  _details.mobile = mobile;
};

var _updateEmail = function (email){
 _details.email = email;
};

var _findMatches = function(str){

  if (!str && !_matchstr){
    _matches = [];
    return;
  }

  str = str || _matchstr;
  
  _matchstr = str;

  _matches = [];

  if (_details.selectedblock && _details.selectedblock.blockId) 
      _matches = _details.apartments[_details.selectedblock.blockId] || [];
  

  _matches = _matches.filter(function(apartment){
    return apartment.name.toLowerCase().indexOf(str.toLowerCase()) > -1;
  });
};

var _selectOccupancy = function(occupancy){
  _details.selectedoccupancy = occupancy;
};

var _selectApartment = function(apartment){
   _details.apartment = apartment;
};

var _unselectApartment = function(){
   _details.apartment = null;
};

var _selectApartmentByName = function(name){
  if (_details.selectedblock &&  _details.selectedblock.blockId){ 
      _apartment =  _details.apartments[_details.selectedblock.blockId].filter(function(apartment){
        return apartment.name.toLowerCase() === name.toLowerCase().trim();
      }).reduce(function(acc, obj){
        return obj;
      },null);
  }
};

var _setDevelopment = function(development){
   _details.development = development;
  
  _details.apartments = _details.development.blocks.reduce(function(acc, block){
    acc[block.blockId] = block.apartments;
    return acc;
  }, {});
};


var _selectBlock = function(block){
   _details.selectedblock = block;
};

var RegisterStore = assign({}, EventEmitter.prototype, {


  readytosubmit: function(){
    
    var checknull =   ['development', 'selectedblock', 'apartment', 'selectedoccupancy'];
    var checkempty =  ['mobile', 'email', 'username', 'firstname', 'surname'];
  
    var ready = checknull.reduce(function(acc, obj){
      return acc && _details[obj] !== null;
    },checkempty.reduce(function(acc, obj){
      return acc && _details[obj] ? _details[obj].trim() !== "" : false;
    }, true));

    return ready;
  },

  details : function(){
    return _details;
  },

  occupancies: function(){
    return _occupancies;
  },

  matches: function(nolargerthan){
    if (nolargerthan)
      return _matches.length > nolargerthan? [] : _matches;
    return _matches;
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
RegisterStore.dispatchToken = AppDispatcher.register(function(action) {

  switch(action.action.type) {

  case ActionTypes.RAW_DEVELOPMENT:
    _setDevelopment(action.action.data);
    RegisterStore.emitChange();
    break;

  case ActionTypes.BLOCK_SELECTED:
    _selectBlock(action.action.block);
    _findMatches();
    _unselectApartment();
    RegisterStore.emitChange();
    break;

  case ActionTypes.APARTMENT_PARTIAL:
    _findMatches(action.action.partial);
    RegisterStore.emitChange();
    break;

  case ActionTypes.APARTMENT_SELECTED:
    _selectApartment(action.action.apartment);
    RegisterStore.emitChange();
    break;

  case ActionTypes.APARTMENT_SELECTED_BY_NAME:
    _selectApartmentByName(action.action.name);
    RegisterStore.emitChange();
    break;

  case ActionTypes.OCCUPANCY_SELECTED:
    _selectOccupancy(action.action.occupancy);
    RegisterStore.emitChange();
    break;

  case ActionTypes.MOBILE_UPDATED:
    
    _updateMobile(action.action.mobile);
    RegisterStore.emitChange();
    break;

  case ActionTypes.EMAIL_UPDATED:

    _updateEmail(action.action.email);
    RegisterStore.emitChange();
    break;

  case ActionTypes.USERNAME_UPDATED:
    _updateUsername(action.action.username);
    RegisterStore.emitChange();
    break;

  case ActionTypes.USERNAME_SET:
    _setUsername(action.action.username);
    RegisterStore.emitChange();
    break;

  case ActionTypes.FIRSTNAME_UPDATED:
    _updateFirstname(action.action.firstname);
    RegisterStore.emitChange();
    break;

  case ActionTypes.SURNAME_UPDATED:
    _updateSurname(action.action.surname);
    RegisterStore.emitChange();
    break;

  default:
      // no op
  }
});

module.exports = RegisterStore;
