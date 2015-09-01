/*
 * Copyright (c) 2015, Tom Lodge
 * All rights reserved.
 *
 * ScreenActionCreators
 */

var AppDispatcher = require('../dispatcher/AppDispatcher');
var RegisterConstants = require('../constants/RegisterConstants');

var ActionTypes = RegisterConstants.ActionTypes;

var NavigationActionCreators = {

  changeScreen: function(screen){
  	console.log("ok - schanging screen to");
  	console.log(screen);
  	
  	AppDispatcher.handleViewAction({
      	type: ActionTypes.CHANGE_SCREEN,
     	screen: screen,
    });
  },

  nextScreen: function(){
  	
  	AppDispatcher.handleViewAction({
      	type: ActionTypes.NEXT_SCREEN,
     	screen: screen,
    });
  },

  previousScreen: function(){
  	
  	AppDispatcher.handleViewAction({
      	type: ActionTypes.PREVIOUS_SCREEN,
     	screen: screen,
    });
  }

};


module.exports = NavigationActionCreators;