/*
 * Copyright (c) 2015, Tom Lodge
 * All rights reserved.
 *
 * RegisterConstants
 */

var keyMirror = require('keymirror');

module.exports = {

	ActionTypes: keyMirror({
		CHANGE_SCREEN:null,
		NEXT_SCREEN: null,
		PREVIOUS_SCREEN: null,
		RAW_DEVELOPMENT: null,
		BLOCK_SELECTED: null,
		APARTMENT_PARTIAL: null,
		APARTMENT_SELECTED: null,
		APARTMENT_SELECTED_BY_NAME: null,
		OCCUPANCY_SELECTED:null,
		MOBILE_UPDATED:null,
		EMAIL_UPDATED:null,
		USERNAME_UPDATED:null,
		FIRSTNAME_UPDATED:null,
		SURNAME_UPDATED:null,
  	}),

  	PayloadSources: keyMirror({
    	SERVER_ACTION: null,
    	VIEW_ACTION: null
  	}),
};
