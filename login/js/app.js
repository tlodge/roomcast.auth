/**
 * Copyright (c) 2015, Tom Lodge
 * All rights reserved.
 */

import React from 'react';
import { render } from 'react-dom';

var Splash = require('./components/Splash.react');

var App = React.createClass({
	render: function(){
		return <Splash />;
	}
});

render(
	<App />, document.getElementById('login')
);
