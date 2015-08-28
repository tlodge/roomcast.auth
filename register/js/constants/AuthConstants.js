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
  	}),

  	PayloadSources: keyMirror({
    	SERVER_ACTION: null,
    	VIEW_ACTION: null
  	}),
};
