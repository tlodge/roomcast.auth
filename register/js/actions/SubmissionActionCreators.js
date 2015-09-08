/*
 * Copyright (c) 2015, Tom Lodge
 * All rights reserved.
 *
 * SubmissionActionCreators
 */

var WebAPIUtils = require("../utils/WebAPIUtils");

var SubmissionActionCreators = {

  register: function(data){
  	 var registerdata = {
  	 	developmentId: data.development.developmentId,
  	 	username: data.username,
  	 	firstname: data.firstname,
  	 	surname: data.surname,
  	 	blockId: data.selectedblock.blockId,
  	 	apartmentId: data.apartment.apartmentId,
  	 	occupancy: data.selectedoccupancy.id,
  	 	email: data.email,
  	 	mobile: data.mobile,
  	 };
  	 WebAPIUtils.register(registerdata);
  },

};


module.exports = SubmissionActionCreators;