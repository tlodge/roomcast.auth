/**
 * Copyright (c) 2015, Tom Lodge
 * All rights reserved.
 */

var React = require('react');
var Splash = require('./components/Splash.react');

React.initializeTouchEvents(true);


var App = React.createClass({
	render: function(){
		return <Splash />;
	}

});

React.render(
	<App />, document.getElementById('login')
);
