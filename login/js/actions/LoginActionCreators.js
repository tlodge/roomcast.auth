/*
 * Copyright (c) 2015, Tom Lodge
 * All rights reserved.
 *
 * LoginActionCreators
 */

var AppDispatcher = require('../dispatcher/AppDispatcher');
var AuthConstants = require('../constants/AuthConstants');

var ActionTypes = AuthConstants.ActionTypes;

var LoginActionCreators = {

  loginFailure: function(message){
  	console.log("DISPATCHING LOGIN FAILRE!!!");
  	AppDispatcher.handleViewAction({
    	type: ActionTypes.LOGIN_FAILURE,
    	message: message,
    });
  }
};

module.exports = LoginActionCreators;