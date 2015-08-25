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


    var loginHeight = 276;
    var loginwidth = 276;
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
    var bottomratio   = 640/100; 
    var houseratio    = Math.floor(640/125);
    var bottombarheight = this.props.width/bottomratio;
    var titleheight = 40;
    var formpadding = Math.ceil(this.props.width / houseratio);
    var textinputheight = 37;
    var textinputmargin = 16;

    var containerheight = (this.props.height - toolbarheight- bottombarheight)/2;
    var formheight = (textinputheight * 2) + textinputmargin;

    var topbar ={
      background: '#445662',
      height: toolbarheight,
      color: 'white',
      lineHeight: toolbarheight + 'px',
      paddingLeft: 10,
      paddingRight: 10,
    };

    var loginback = {
      background: "url(../svgs/registerback.svg) no-repeat center bottom fixed",
      height: this.props.height,
      width: '100%',
      boxSizing: 'border-box',
      /*paddingTop: hpadding,
      paddingLeft: vpadding,
      paddingRight: vpadding,*/
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
    

  /*
  */

    var maintitle = {
      fontSize: '250%',
    };
    
    var back = {
      fontSize: '180%',
    };

    var submitstyle = {
      position: 'absolute',
      textAlign: 'center',
      bottom: 0,
      left: formpadding,
      width: this.props.width - (formpadding),
      height: bottombarheight,
      color: 'white',
      lineHeight: bottombarheight + 'px',
      fontSize: '150%',
      zIndex: 30,
    };

    var left={float:left, color: 'white'};
    var right={float:right, color: 'white'};
    var imagestyle={position:'absolute', bottom:0, width: '100%', zIndex: 20};

		return(
      <div style={loginback}>
         <div>
          <img  style={imagestyle} src="../svgs/bottombar.svg"/>
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

  _submit: function(){
    console.log("seen submit");
    
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
    return <input type="text" errorText={this.props.errorText} name="password" floatingLabelText="your password" placeholder="password"/>;
  }

});

module.exports = Login;
