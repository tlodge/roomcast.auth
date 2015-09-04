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
  	}),

  	PayloadSources: keyMirror({
    	SERVER_ACTION: null,
    	VIEW_ACTION: null
  	}),
};
