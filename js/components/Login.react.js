var React = require('react');
var TextField = require('./mui/text-field');
var WebAPIUtils = require('../utils/WebAPIUtils');

var Login = React.createClass({

	getInitialState: function() {
    return {username:"", password:"", usernameerror:"", passworderror:""};
  },

	componentDidMount: function() {

  },

  componentWillUnmount: function() {

  },

	render: function(){


    var loginHeight = 276;
    var loginWidth = 276;
    var horizontalpadding = 10;
    var vpadding = 15;
    var hpadding  = 10;
   /* var loginStyle={
        position: 'absolute',
        width: loginWidth,
        height: loginHeight,
        left: (windowwidth - loginWidth)/2,
        top:  (windowheight - loginHeight)/2
    };*/
    var toolbarheight = 74;

    var topbar ={
      background: '#323232',
      height: toolbarheight,
      color: 'white',
      lineHeight: toolbarheight + 'px',
      fontSize: '250%',
      paddingLeft: 10,
    };

    var loginback = {
      background: "url(../svgs/loginback.svg) no-repeat center center fixed",
      width: this.props.width,
      height: this.props.height-toolbarheight,
      backgroundSize: 'cover',
      '-webkit-background-size':'cover',
      '-moz-background-size':'cover',
      '-o-background-size':'cover',
      'background-size':'cover',
      boxSizing: 'border-box',
      paddingTop: hpadding,
      paddingLeft: vpadding,
      paddingRight: vpadding,
    };


    var sociallogin = {
      background: 'white',
      width: '100%',
      opacity: 0.9,
      padding: 10,
      height: (this.props.height - toolbarheight)/2 - (hpadding*2),
    };

    var roomcastlogin = {
      background: 'white',
      width: '100%',
      opacity: 0.9,
      padding: 10,
      marginTop: hpadding,
      height: (this.props.height - toolbarheight)/2 - (hpadding*2),
    };

    var title = {
        width : "100%",
        fontSize: "120%",
        color: 'black',
        textAlign: 'center',
    };
    /*
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
      </Paper>*/

		return(
      <div>
        <div style={topbar}>
            login
        </div>
  			<div style={loginback}>
          <div style={sociallogin}>
            <div style={title}>login with <strong>facebook</strong> or <strong>google</strong></div>
          </div>
          <div style={roomcastlogin}>
            <div style={title}>login with your <strong>roomcast</strong> account </div>
          </div>
        </div>
      </div>
		);
	},

  _handlePasswordUpdate: function(password){
    if (password !== ""){
      this.setState({passworderror:""});
    }
    this.setState({password:password});
    console.log(password);
  },

  _handleUserNameUpdate: function(username){
    if (username !== ""){
      this.setState({usernameerror:""});
    }
    this.setState({username:username});
    console.log(username);
  },

  _handleSubmit: function(e){
    if (this.state.username === ""){
      this.setState({usernameerror:"please provide your username"});
      e.preventDefault();
    }
    if (this.state.username === ""){
      this.setState({passworderror:"please provide your password!"});
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
    return <TextField errorText={this.props.errorText} name="username" value={this.state.username} onBlur={this._onLoseFocus} onChange={this._onTextChange} floatingLabelText="your username" hintText="username"/>;
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

    if (username  && username!=="") {
			this.props.handleUpdate(username);
		}
  },
});


var LoginPassword = React.createClass({

  render: function(){
    return <TextField errorText={this.props.errorText} name="password" floatingLabelText="your password" hintText="password"/>;
  }

});

module.exports = Login;
