/**
 * Copyright (c) 2015, Tom Lodge
 * All rights reserved.
 */

var React = require('react');
var Splash = require('./components/Splash.react');
var RegisterActionCreators = require('./actions/RegisterActionCreators');

React.initializeTouchEvents(true);


var App = React.createClass({

  	
	componentWillMount: function(){
		RegisterActionCreators.setUsername(document.getElementById("register").getAttribute("data-username").trim());
	},

	render: function(){
		return <Splash />;
	}

});

React.render(
	<App />, document.getElementById('register')
);
