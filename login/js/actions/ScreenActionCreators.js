/*
 * Copyright (c) 2015, Tom Lodge
 * All rights reserved.
 *
 * ScreenActionCreators
 */

var AppDispatcher = require('../dispatcher/AppDispatcher');
var AuthConstants = require('../constants/AuthConstants');

var ActionTypes = AuthConstants.ActionTypes;

var ScreenActionCreators = {

  changeScreen: function(screen){
  	AppDispatcher.handleViewAction({
      	type: ActionTypes.CHANGE_SCREEN,
     	screen: screen,
    });
  }
};

module.exports = ScreenActionCreators;