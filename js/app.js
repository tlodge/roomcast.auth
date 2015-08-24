/**
 * Copyright (c) 2015, Tom Lodge
 * All rights reserved.
 */

var React = require('react');
var Splash = require('./components/Splash.react');
React.initializeTouchEvents(true);

React.render(
	<Splash />, document.getElementById('login')
);
