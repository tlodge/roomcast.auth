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
  	console.log("ok - got development");
  	console.log(data);
  	
  	AppDispatcher.handleServerAction({
      type: ActionTypes.RAW_DEVELOPMENT,
     	data: data,
    });
  },

};


module.exports = ServerActionCreators;