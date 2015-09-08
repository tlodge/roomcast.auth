/*
 * Copyright (c) 2015, Tom Lodge
 * All rights reserved.
 *
 * AuthenticationStore
 */

var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var RegisterConstants = require('../constants/RegisterConstants');
var assign = require('object-assign');
var DevelopmentStore = require('./DevelopmentStore');

var CHANGE_EVENT = 'change';
var ActionTypes = RegisterConstants.ActionTypes;
var _screens = ["code", "userdetails","location", "occupancy", "contacts"];
var _screenIndex = 0;


var _set_screen = function(screen){
  
};

var _next_screen = function(){
  _screenIndex = (++_screenIndex)%_screens.length;
};

var _previous_screen = function(){
 _screenIndex = (--_screenIndex)%_screens.length;
};

var _hasvalue = function(obj){
  if (!obj) 
    return false;
  else 
    return obj.trim() !== "";
};

var ScreenStore = assign({}, EventEmitter.prototype, {

  cangoback: function(){
    return _screenIndex !== 0;
  },

  canprogress: function(){

    var _details = DevelopmentStore.details();
    
    switch (_screens[_screenIndex]){

      case "code":
        return  _details.development !== null;
      
      case "userdetails":
        return _hasvalue(_details.username) && _hasvalue(_details.firstname) && _hasvalue(_details.surname); 

      case "location":
        return _details.apartment !== null; 

      case "occupancy":
        return _details.selectedoccupancy!== null; 

      case "contacts":
        return _hasvalue(_details.mobile) && _hasvalue(_details.email); 

      default:
        return false;
    }
  },

  screen: function(){
    return _screens[_screenIndex];
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
ScreenStore.dispatchToken = AppDispatcher.register(function(action) {

  switch(action.action.type) {

    case ActionTypes.CHANGE_SCREEN:
      //_set_screen(action.action.screen);
      //ScreenStore.emitChange();
    break;

    case ActionTypes.NEXT_SCREEN:
      _next_screen();
      ScreenStore.emitChange();
      break;

    case ActionTypes.PREVIOUS_SCREEN:
      _previous_screen();
      ScreenStore.emitChange();
      break;

    default:
      // no op
  }
});

module.exports = ScreenStore;
