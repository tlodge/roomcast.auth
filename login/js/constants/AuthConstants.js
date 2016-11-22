/*
 * Copyright (c) 2015, Tom Lodge
 * All rights reserved.
 *
 * AuthConstants
 */

var keyMirror = require('keymirror');

module.exports = {

	ActionTypes: keyMirror({
		CHANGE_SCREEN:null,
		LOGIN_FAILURE:null,
		TOGGLE_FORGOTTEN: null,
		RESET_COMPLETE: null,
  	}),

  	PayloadSources: keyMirror({
    	SERVER_ACTION: null,
    	VIEW_ACTION: null
  	}),
};
