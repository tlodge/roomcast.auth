var React = require('react');
var TextField = require('./mui/text-field');
var WebAPIUtils = require('../utils/WebAPIUtils');
var ScreenActionCreators = require('../actions/ScreenActionCreators');
var mui = require('material-ui');
var TextField = mui.TextField;
var RaisedButton = mui.RaisedButton;

var Login = React.createClass({

	getInitialState: function() {
    return {username:"", password:"", usernameerror:"", passworderror:""};
  },

	componentDidMount: function() {

  },

  componentWillUnmount: function() {

  },

	render: function(){

    var toolbarheight   = 74;
    var loginwidth      = 276;
    var titleheight     = 40;
    var textinputheight = 37;
    var textinputmargin = 16;
    var houseaspect     = 200/240;
    var shadowratio     = 100/240;
    var containerheight = Math.max(120, (this.props.height - toolbarheight- toolbarheight)/2);
    var formheight      = (textinputheight * 2) + textinputmargin;
    var housewidth      = (toolbarheight / shadowratio) * houseaspect;

    console.log("container height is");
    console.log(containerheight);
    var topbar ={
      background: '#445662',
      height: toolbarheight,
      color: 'white',
      lineHeight: toolbarheight + 'px',
      paddingLeft: 15,
      paddingRight: 15,
    };

     var maintitle = {
      fontSize: '150%',
    };
    
    var back = {
      fontSize: '120%',
    };


    var loginback = {
      background: "url(../svgs/registerback.svg) no-repeat center bottom fixed",
      height: this.props.height,
      width: '100%',
      boxSizing: 'border-box',
    };

    var sociallogin = {
      boxSizing: 'border-box',
      position: 'absolute',
      top: toolbarheight,
      background: '#e6e6e6',
      opacity: 0.8,
      width: '100%',
      height: containerheight,
      zIndex: 2,
    };

    var roomcastlogin = {
      boxSizing: 'border-box',
      background: 'white',
      opacity: 0.95,
      width: '100%',
      height: containerheight,
      position: 'absolute',
      top: containerheight + toolbarheight,
      zIndex: 2,
    };

    var logincontainer = {
      boxSizing: 'border-box',
      width: loginwidth  + 10,
      position: 'absolute',
      top:  (containerheight+toolbarheight+titleheight) + (containerheight-titleheight-formheight)/2,
      zIndex: 500,
      left: (this.props.width - loginwidth) / 2,
    };

    var socialcontainer = {
      boxSizing: 'border-box',
      width: '100%',
      height: containerheight - titleheight,
      position: 'absolute',
      top: titleheight + toolbarheight,
      zIndex: 500,
    };

    var container = {
      width: '100%',
      height: '100%',
    };

    var title = {
        width : "100%",
        fontSize: "120%",
        color: 'black',
        textAlign: 'center',
        height: titleheight,
        padding: 0,
        lineHeight: titleheight + 'px',
    };
  
   

    var submitstyle = {
      position: 'absolute',
      textAlign: 'center',
      bottom: 0,
      left:  (housewidth  * 120/200),
      width: this.props.width - (housewidth  * 120/200),
      height: toolbarheight,
      minHeight: toolbarheight,
      color: 'white',
      lineHeight: toolbarheight + 'px',
      fontSize: '150%',
      zIndex: 30,
    };
 
    var google={
        position: 'absolute',
        width: this.props.width/2,
        height: "100%",
        padding: this.props.width / 20,
    };

    var facebook={
        position: 'absolute',
        left: this.props.width/2,
        width: this.props.width/2,
        height: "100%",
        padding: this.props.width / 20,
    };

    var socialimgstyle ={
      display: 'block',
      marginLeft: 'auto',
      marginRight: 'auto',
      width: (this.props.width / 2) > (containerheight - titleheight) ? 'auto' : "100%",
      height: (this.props.width / 2) > (containerheight - titleheight) ? '100%' : "auto%"
    };

    var imagestyle={
      position:'absolute', 
      bottom:0, 
      width: housewidth, 
      zIndex: 20
    };

    var submitbar ={
      position: 'absolute',
      bottom: 0,
      left: housewidth  * 120/200,
      height: toolbarheight,
      width: this.props.width - (housewidth  * 120/200),
      background: "#d35a51",
      color: 'white',
    };

		return(
      <div style={loginback}>
         <div>
          <img  style={imagestyle} src="../svgs/house.svg"/>
          <div style={submitbar}></div>
        </div>

        <div className='clearfix' style={topbar}>
            <a style={maintitle} className='left'>login</a>
            <a onTouchTap={this._handleBack} style={back} className='right'>back</a>
        </div>
        <div style={sociallogin}>
            <div style={container}>
              <div style={title}>login with <strong>facebook</strong> or <strong>google</strong></div>
            </div>
          </div>
          <div style={roomcastlogin}>
            <div style={container}>
                <div style={title}>login with your <strong>roomcast</strong> account </div>
            </div>
          </div>

          <div style={socialcontainer}>
            <div style={google}>
              <img style={socialimgstyle} src="../svgs/social/google.svg"/>
            </div>
            <div style={facebook}>
              <img style={socialimgstyle} src="../svgs/social/facebook.svg"/>
            </div>
          </div>

          <div style={logincontainer}>
            <form ref="login" action="/login" method="post">
              <div>
                <LoginUserName errorText={this.state.usernameerror} username={this.state.username} handleUpdate={this._handleUserNameUpdate} />
                <LoginPassword errorText={this.state.passworderror} password={this.state.password} handleUpdate={this._handlePasswordUpdate}/>
              </div>    
              
            </form>
          </div>
          <div onTouchTap={this._handleSubmit} style={submitstyle}>
                submit!
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

  _handleSubmit: function(){
  
    var valid = true;
    if (this.state.username === ""){
      this.setState({usernameerror:"please provide your username"});
      valid = false;
    }
    
    if (this.state.password === ""){
      this.setState({passworderror:"please provide your password!"});
      valid = false;
    }

    if (valid){
      React.findDOMNode(this.refs.login).submit();
    }
  },

  _handleBack: function(){
    ScreenActionCreators.changeScreen("splash");
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
    return <input type="text" errorText={this.props.errorText} name="username" value={this.state.username} onBlur={this._onLoseFocus} onChange={this._onTextChange} floatingLabelText="your username" placeholder="username"/>;
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
    return <input type="password" errorText={this.props.errorText} name="password" floatingLabelText="your password" placeholder="password"/>;
  }

});

module.exports = Login;
