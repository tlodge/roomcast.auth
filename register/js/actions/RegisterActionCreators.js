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

  selectBlock: function(block){
    
  	AppDispatcher.handleViewAction({
      type: ActionTypes.BLOCK_SELECTED,
     	block: block,
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

  selectApartmentByName: function(name){
     AppDispatcher.handleViewAction({
      type: ActionTypes.APARTMENT_SELECTED_BY_NAME,
      name: name,
    });
  },

  selectOccupancy: function(occupancy){
     AppDispatcher.handleViewAction({
      type: ActionTypes.OCCUPANCY_SELECTED,
      occupancy: occupancy,
    });
  },

  updateMobile: function(mobile){
    AppDispatcher.handleViewAction({
      type: ActionTypes.MOBILE_UPDATED,
      mobile: mobile,
    });
  },

  updateEmail: function(email){
     AppDispatcher.handleViewAction({
      type: ActionTypes.EMAIL_UPDATED,
      email: email,
    });
  },

  updateUsername: function(username){
     AppDispatcher.handleViewAction({
      type: ActionTypes.USERNAME_UPDATED,
      username: username,
    });
  },

  updateFirstname: function(firstname){
  
     AppDispatcher.handleViewAction({
      type: ActionTypes.FIRSTNAME_UPDATED,
      firstname: firstname,
    });
  },

  updateSurname: function(surname){
     AppDispatcher.handleViewAction({
      type: ActionTypes.SURNAME_UPDATED,
      surname: surname,
    });
  }
};


module.exports = RegisterActionCreators;