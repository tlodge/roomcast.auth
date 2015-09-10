/*
 * Copyright (c) 2015, Tom Lodge
 * All rights reserved.
 *
 * ServerActionCreators
 */

var AppDispatcher = require('../dispatcher/AppDispatcher');
var RegisterConstants = require('../constants/RegisterConstants');

var ActionTypes = RegisterConstants.ActionTypes;

var ServerActionCreators = {

  receivedDevelopment: function(data){
  	AppDispatcher.handleServerAction({
      type: ActionTypes.RAW_DEVELOPMENT,
     	data: data,
    });
  },

  registrationResponse: function(data){
      if (data.error){
        //handle the error here and pass in messages!
      }else{
        window.location.href = data.redirect;
      }
  },
};


module.exports = ServerActionCreators;