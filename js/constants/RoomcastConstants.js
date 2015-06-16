/*
 * Copyright (c) 2015, Tom Lodge
 * All rights reserved.
 *
 * RoomcastConstants
 */

var keyMirror = require('keymirror');

module.exports = {

	ActionTypes: keyMirror({
			BUTTON_PRESSED: null,
    	RECEIVE_RAW_BUTTONS: null,
    	RECEIVE_RAW_PRESSES: null,
    	RECEIVE_RAW_PRESS_RESPONSE: null,
    	RECEIVE_RAW_THREADS: null,
    	RECEIVE_RAW_MESSAGE_RESPONSE: null,
			RECEIVE_RAW_BUTTON_INFORMATION: null,

    	CLICK_THREAD: null,
    	CREATE_MESSAGE: null,
    	CHANGE_SCREEN: null,
    	CREATE_THREAD: null,
    	RECEIVE_RAW_CREATED_MESSAGE: null,

    	ANSWERED_QUESTION: null,

			RAW_LOGIN: null,
  	}),

  	PayloadSources: keyMirror({
    	SERVER_ACTION: null,
    	VIEW_ACTION: null
  	}),
};
