/**
 * Copyright (c) 2015, Tom Lodge
 * All rights reserved.
 */

var React = require('react');
var injectTapEventPlugin = require("react-tap-event-plugin");
var RoomcastWebAPIUtils = require('./utils/RoomcastWebAPIUtils');
var Login = require('./components/Login.react');

injectTapEventPlugin();
React.initializeTouchEvents(true);

React.render(
	<Login />, document.getElementById('login')
)
