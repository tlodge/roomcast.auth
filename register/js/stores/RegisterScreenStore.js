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

var CHANGE_EVENT = 'change';
var ActionTypes = RegisterConstants.ActionTypes;
var _screens = ["location", "occupancy", "contacts"];
var _screenIndex = 0;


var _set_screen = function(screen){
  
};

var _next_screen = function(){
  _screenIndex = (++_screenIndex)%_screens.length;
};

var _previous_screen = function(){
 _screenIndex = (++_screenIndex)%_screens.length;
};

var ScreenStore = assign({}, EventEmitter.prototype, {

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