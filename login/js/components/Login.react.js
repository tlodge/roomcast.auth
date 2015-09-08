var React = require('react');
var WebAPIUtils = require('../utils/WebAPIUtils');
var ScreenActionCreators = require('../actions/ScreenActionCreators');
var TextField = require('./TextField.react');

var Login = React.createClass({

	getInitialState: function() {
    return {username:"", password:"", usernameerror:"", passworderror:""};
  },

	componentDidMount: function() {

  },

  componentWillUnmount: function() {

  },

	render: function(){

    var toolbarheight   = 54;
    var loginwidth      = 276;
    var titleheight     = 40;
    var textinputheight = 37;
    var textinputmargin = 16;
    var houseaspect     = 200/240;
    var shadowratio     = 100/240;
    var containerheight = Math.max(120, (this.props.height - toolbarheight- toolbarheight)/2);
    var formheight      = (textinputheight * 2) + textinputmargin;
    var housewidth      = (toolbarheight / shadowratio) * houseaspect;

    var topbar ={
      background: 'rgb(91,91,91)',
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
      background: "url(../svgs/registerback.svg) no-repeat center bottom",
      height: this.props.height,
      width: this.props.width,
    };

    var sociallogin = {
      boxSizing: 'border-box',
      position: 'absolute',
      top: toolbarheight,
      background: '#e6e6e6',
      opacity: 0.8,
      width: this.props.width,
      height: containerheight,
      zIndex: 2,
    };

    var roomcastlogin = {
      boxSizing: 'border-box',
      background: 'white',
      opacity: 0.95,
      width: this.props.width,
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
      width: this.props.width,
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
        width : this.props.width,
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
        padding: this.props.width / 10,
    };

    var facebook={
        position: 'absolute',
        left: this.props.width/2,
        width: this.props.width/2,
        height: "100%",
        padding: this.props.width / 10,
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
            <a style={maintitle} className='left'> {this.props.action}</a>
            <a onTouchTap={this._handleBack} style={back} className='right'>back</a>
        </div>
        <div style={sociallogin}>
            <div style={container}>
              <div style={title} dangerouslySetInnerHTML={{__html:this.props.socialtitle}}></div>
            </div>
          </div>
          
          <div style={roomcastlogin}>
            <div style={container}>
                <div style={title} dangerouslySetInnerHTML={{__html:this.props.roomcasttitle}}></div>
            </div>
          </div>

          <div style={socialcontainer}>
            <a href="/auth/google" style={google}>
              <img style={socialimgstyle} src="../svgs/social/google.svg"/>
            </a>
            <div style={facebook}>
              <img style={socialimgstyle} src="../svgs/social/facebook.svg"/>
            </div>
          </div>

          <div style={logincontainer}>
            <form ref="submissionform" action={this.props.actionurl} method="post">
              <div>
                 <TextField errorText={this.state.usernameerror} name="username" value={this.state.username} handler={this._handleUserNameUpdate}/>
                 <TextField type="password" name="password" errorText={this.state.passworderror} value={this.state.password} handler={this._handlePasswordUpdate}/>
              </div>    
              
            </form>
          </div>
          <div onTouchTap={this._handleSubmit} style={submitstyle}>
                {this.props.action}
          </div>  
      </div>
		);
	},

  _handlePasswordUpdate: function(password){
    console.log("seen password update!!");
    if (password !== ""){
      this.setState({passworderror:""});
    }
    this.setState({password:password});
    console.log(password);
  },

  _handleUserNameUpdate: function(username){
    console.log("seen username update!!");
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
      console.log("submitting form!!!");
      console.log(React.findDOMNode(this.refs.submissionform));
      React.findDOMNode(this.refs.submissionform).submit();
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
