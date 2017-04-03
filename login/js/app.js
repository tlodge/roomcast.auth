import React from 'react';
import { render } from 'react-dom';
import "../css/login.css";
import "../css/foundation/css/foundation.min.css";

var Splash = require('./components/Splash.react');

var App = React.createClass({
	render: function(){
		return <Splash />;
	}
});

render(
	<App />, document.getElementById('login')
);
