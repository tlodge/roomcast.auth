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

  lookupApartment: function(partial){
    AppDispatcher.handleViewAction({
      type: ActionTypes.APARTMENT_PARTIAL,
      partial: partial,
    });
  },

  selectApartment: function(apartment){
    AppDispatcher.handleViewAction({
      type: ActionTypes.APARTMENT_SELECTED,
      apartment: apartment,
    });
  },

};


module.exports = RegisterActionCreators;