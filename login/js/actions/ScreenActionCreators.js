/*
 * Copyright (c) 2015, Tom Lodge
 * All rights reserved.
 *
 * ScreenActionCreators
 */

var AppDispatcher = require('../dispatcher/AppDispatcher');
var AuthConstants = require('../constants/AuthConstants');

var ActionTypes = AuthConstants.ActionTypes;

var NavigationActionCreators = {

  changeScreen: function(screen){
  	console.log("ok - schanging screen to");
  	console.log(screen);
  	
  	AppDispatcher.handleViewAction({
      	type: ActionTypes.CHANGE_SCREEN,
     	screen: screen,
    });
  }
};

module.exports = NavigationActionCreators;