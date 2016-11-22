/*
 * Copyright (c) 2015, Tom Lodge
 * All rights reserved.
 *
 * LoginActionCreators
 */

var AppDispatcher = require('../dispatcher/AppDispatcher');
var AuthConstants = require('../constants/AuthConstants');
var ActionTypes = AuthConstants.ActionTypes;
var WebAPIUtils = require('../utils/WebAPIUtils');

var LoginActionCreators = {

  toggleForgotten: function(){
  	AppDispatcher.handleViewAction({
    	type: ActionTypes.TOGGLE_FORGOTTEN,
    });
  },

  requestReset: function(email){
	WebAPIUtils.passwordReset(email);
  },

};

module.exports = LoginActionCreators;