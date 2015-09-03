/*
 * Copyright (c) 2015, Tom Lodge
 * All rights reserved.
 *
 * RegisterActionCreators
 */

var AppDispatcher = require('../dispatcher/AppDispatcher');
var RegisterConstants = require('../constants/RegisterConstants');

var ActionTypes = RegisterConstants.ActionTypes;

var RegisterActionCreators = {

  selectBlock: function(blockId){
    
  	AppDispatcher.handleViewAction({
      type: ActionTypes.BLOCK_SELECTED,
     	blockId: blockId,
    });
  },

};


module.exports = RegisterActionCreators;