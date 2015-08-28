/**
 * Copyright (c) 2015, Tom Lodge
 * All rights reserved.
 */

var React = require('react');
var Splash = require('./components/Splash.react');
var mui = require('material-ui');
var ThemeManager = new mui.Styles.ThemeManager();

React.initializeTouchEvents(true);


var App = React.createClass({

  	getChildContext: function() {
	    return {
	      muiTheme: ThemeManager.getCurrentTheme()
	    };
	},

	componentWillMount: function(){
		ThemeManager.setComponentThemes({
			raisedButton: {

	        	primaryColor: '#e93631',
	        	secondaryColor: '#afe9c6',
	        	primaryTextColor: '#fff',
	        	seconddaryTextColor: '#000',
			},
	      	toolbar:{
	        	backgroundColor: "#7698b0"
	      	},
	      	tabs:{
	        	backgroundColor: "#333333"
	      	},
	      	appBar:{
	        	color: "#7698b0"
	      	}
		});
	},

	render: function(){
		return <Splash />;
	}

});

App.childContextTypes = {
  muiTheme: React.PropTypes.object
};

React.render(
	<App />, document.getElementById('register')
);
