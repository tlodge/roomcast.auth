var React = require('react');
var TextField = require('./mui/text-field');
var Paper = require('./mui/paper');
var RaisedButton = require('./mui/raised-button');
var WebAPIUtils = require('../utils/RoomcastWebAPIUtils');
var $ = require('jquery')

var windowheight =  $(window).height();
var windowwidth  =  $(window).width();

var Login = React.createClass({

	getInitialState: function() {
    return {username:"", password:"", usernameerror:"", passworderror:""}
  },

	componentDidMount: function() {

  },

  componentWillUnmount: function() {

  },

	render: function(){


    var loginHeight = 276;
    var loginWidth = 276;

    var loginStyle={
        position: 'absolute',
        width: loginWidth,
        height: loginHeight,
        left: (windowwidth - loginWidth)/2,
        top:  (windowheight - loginHeight)/2
    };



		return(
			<Paper zDepth={1} style={loginStyle}>
				<form ref="login" onSubmit={this._handleSubmit} className="loginbox"  action="/login" method="post">
          <div className="logintitle"> <strong> roomcast </strong>login </div>
          <div className="loginform">
            <LoginUserName errorText={this.state.usernameerror} username={this.state.username} handleUpdate={this._handleUserNameUpdate} />
            <LoginPassword errorText={this.state.passworderror} password={this.state.password} handleUpdate={this._handlePasswordUpdate}/>
          </div>
          <div className="loginsubmitfooter">
            <RaisedButton primary={true} label="login"/>
          </div>
        </form>
			</Paper>
		)
	},

  _handlePasswordUpdate: function(password){
    if (password != ""){
      this.setState({passworderror:""});
    }
    this.setState({password:password});
    console.log(password);
  },

  _handleUserNameUpdate: function(username){
    if (username != ""){
      this.setState({usernameerror:""});
    }
    this.setState({username:username});
    console.log(username);
  },

  _handleSubmit: function(e){
    if (this.state.username === ""){
      this.setState({usernameerror:"please provide your username"})
      e.preventDefault();
    }
    if (this.state.username === ""){
      this.setState({passworderror:"please provide your password!"})
      e.preventDefault();
    }
  },

	/**
 	 * Event handler for 'change' events coming from the stores
 	 */
	_onChange: function() {
  	this.setState(getStateFromStores());
	}
});

var LoginUserName = React.createClass({

  getInitialState: function() {
    	return {username: this.props.username || ""};
  },

  render: function(){
    return <TextField errorText={this.props.errorText} name="username" value={this.state.username} onBlur={this._onLoseFocus} onChange={this._onTextChange} floatingLabelText="your username" hintText="username"/>
  },

  _onTextChange: function(event, value) {
    	this.setState({username: event.target.value});
  },

	_onLoseFocus: function(event){
		event.preventDefault();
		this._handleUserNameUpdate();
	},

  _handleUserNameUpdate: function(){

    var username = this.state.username.trim();

    if (username  && username!="") {
			this.props.handleUpdate(username);
		}
  },
});


var LoginPassword = React.createClass({

  render: function(){
    return <TextField errorText={this.props.errorText} name="password" floatingLabelText="your password" hintText="password"/>
  }

});

module.exports = Login;
