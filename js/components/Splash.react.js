var React = require('react');
var $ = require('jquery');
var extend = require('extend');
var ScreenActionCreators = require('../actions/ScreenActionCreators');
var ScreenStore = require('../stores/ScreenStore');
var Login = require("./Login.react");

injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();

function getStateFromStores() {
  return {
    screen: ScreenStore.screen(),
  };
}

var Splash = React.createClass({
  
  getInitialState: function() {
    return {width:$(window).width(), height:$(window).height(), screen:"splash"};
  },

  componentDidMount: function() {
   ScreenStore.addChangeListener(this._onChange);
    window.addEventListener('resize', this._resize);
    var mql = window.matchMedia('(min-width: 800px)');
    mql.addListener(this.mediaQueryChanged);
    this.setState({mql:mql, mobile: !mql.matches});
  },

  componentWillUnmount: function() {
    ScreenStore.removeChangeListener(this._onChange);
    window.removeEventListener('resize', this._resize);
    this.state.removeListener(this.mediaQueryChanged);
  },

  mediaQueryChanged: function(){
    this.setState({mobile: !this.state.mql.matches});
  },

  render: function(){
    var props = {
      width:this.state.width,
      height:this.state.height,
      changeScreen: this._changeScreen,
    };
    
    var screen;
    console.log("ok screen is ");
    console.log(screen);

    switch (this.state.screen){
      
      case "splash":
       
        if (this.state.mobile) 
          screen = <Mobile {...props}/>;
        else
          screen = <BigScreen {...props}/>;
        break;
      
      case "login":
        screen = <Login />;
        break;

      default:

        if (this.state.mobile) 
          screen = <Mobile {...props}/>;
        else
          screen = <BigScreen {...props}/>;
        
        break;

    }
  
    return <div>{screen}</div>;         
  },

  _changeScreen: function(screen){
    console.log("changing screen to " + screen);
    ScreenActionCreators.changeScreen(screen);
  },

  _resize: function(){
    this.setState({width:$(window).width(), height:$(window).height()});
  },

  _onChange: function(){
    this.setState(getStateFromStores());
  },



});

var BigScreen = React.createClass({
  render: function(){
    
    var logoaspect        = 500/180;
    var labelboxheight    = 40;
    
    var containerheight = this.props.height/2;
    var imageheight    = this.props.height/2 - labelboxheight;
    var topimagewidth     = this.props.width/4;
    var bottomimagewidth  = this.props.width/2;

    
    var labelbox = {
      width: "100%",
      height: labelboxheight,
      position: 'absolute',
      bottom: 0,
      color: 'white',
      textAlign: 'center',
      lineHeight: labelboxheight + "px",
      fontSize: "140%",
    };

    var lhlabelbox = extend ({
      background: "#cd804a",
    }, labelbox);
    
    var rhlabelbox= extend ({
      background: "#d35a51",
    },labelbox);

    var blabelbox = extend ({
      background: "#008080",
    },labelbox);

    var smallimagestyle={
      width: topimagewidth > imageheight ? "100%" : 'auto',
      height: imageheight > topimagewidth ? "100%" : 'auto',
      verticalAlign: 'middle',
    };

    var largeimagestyle = {
      width: bottomimagewidth/2 > imageheight ? "100%" : 'auto',
      height: imageheight > bottomimagewidth/2 ? "100%" : 'auto',
      verticalAlign: 'middle',
    };

    var leftscreen = {
      position: 'absolute',
      width: Math.ceil(this.props.width/2),
      left: 0,
      top: 0
    };

    var rightscreen = {
      position: 'absolute',
      width: Math.ceil(this.props.width/2),
      height: "100%",
      left: Math.floor(this.props.width/2),
      top: 0,

    };

    var tl = {
      position: 'absolute',
      width: Math.ceil(this.props.width/4),
      height: containerheight,
      left: 0,
      top: 0,
      overflowX: 'hidden',
      overflowY: 'hidden',
    };

    var tr= {
      position: 'absolute',
      width: Math.ceil(this.props.width/4),
      height: containerheight,
      left: Math.floor(this.props.width/4),
      top: 0,
      overflowX: 'hidden',
      overflowY: 'hidden',
    };

    var b= {
      position: 'absolute',
      width: Math.ceil(this.props.width/2),
      height: containerheight,
      left: 0,
      top: containerheight,
      overflowX: 'hidden',
      overflowY: 'hidden',
    };

    var roomcast ={
      width: "100%",
      height: "100%",
      background: "#445662",
    };

    var logotextcontainer = {
      color: 'white',
      width: '100%',
      height: this.props.height - (bottomimagewidth / logoaspect),
      textAlign: 'center',
      boxSizing: 'border-box',
      paddingTop: (this.props.height - (bottomimagewidth / logoaspect)) /2 ,
    };

    var logoheading ={
      fontSize: '500%',
      textTransform: 'uppercase',
    };

    var logosubheading ={
      fontSize: '150%',
      lineHeight: '400%',
      letterSpacing: '2px',
    };

    var logostyle = {
      position: 'absolute',
      bottom: 0,
      width: '100%',
    };



    return  <div>
              <div style={leftscreen}>
                <div style={tl} onTouchTap={this._registerScreen}>
                  <img style={smallimagestyle} src="../svgs/register.svg"/>
                  <div style={lhlabelbox}>register</div>
                </div>
                 <div style={tr} onTouchTap={this._loginScreen}>
                  <img style={smallimagestyle} src="../svgs/login.svg"/>
                  <div style={rhlabelbox}>log in</div>
                </div>
                 <div style={b} onTouchTap={this._registerBuildingScreen}>
                  <img style={largeimagestyle} src="../svgs/register_building.svg"/>
                  <div style={blabelbox}>register building</div>
              </div>
                 
              </div>
              <div style={rightscreen}>
                <div style={roomcast}>
                  <div style ={logotextcontainer}>
                    <div style={logoheading}>roomcast</div>
                    <div style={logosubheading}>the internet of getting things done</div>
                  </div> 
                  <img style={logostyle} src="../svgs/cloudlogo.svg"/>
                </div>
              </div>
            </div>;
  },

  _loginScreen: function(){
      console.log("changing to login!!");
      this.props.changeScreen("login");
  },

  _registerScreen: function(){
      console.log("changing to register!!");
      this.props.changeScreen("register");
  },

  _registerBuildingScreen: function(){
      console.log("changing to register building!!");
      this.props.changeScreen("registerbuilding");
  },

});

var Mobile = React.createClass({
   render: function(){
    var logobarheight     = 56;
    var labelboxheight    = 40;
    
    var containerheight = (this.props.height-logobarheight)/2;
    

    var topimageheight    =  (this.props.height-logobarheight)/2 - labelboxheight;
    var topimagewidth     = this.props.width/2;


    var bottomimageheight = (this.props.height - logobarheight)/2 - labelboxheight;
    var bottomimagewidth  = this.props.width;

    
    var labelbox = {
      width: "100%",
      height: labelboxheight,
      position: 'absolute',
      bottom: 0,
      color: 'white',
      textAlign: 'center',
      lineHeight: labelboxheight + "px",
      fontSize: "140%",
    };

    var lhlabelbox = extend ({
      background: "#cd804a",
    }, labelbox);
    
    var rhlabelbox= extend ({
      background: "#d35a51",
    },labelbox);

    var blabelbox = extend ({
      background: "#008080",
    },labelbox);

    var smallimagestyle={
      width: topimagewidth > topimageheight ? "100%" : 'auto',
      height: topimageheight > topimagewidth ? "100%" : 'auto',
      verticalAlign: 'middle',
    };

    var largeimagestyle = {
      width: bottomimagewidth/2 > bottomimageheight ? "100%" : 'auto',
      height: bottomimageheight > bottomimagewidth/2 ? "100%" : 'auto',
      verticalAlign: 'middle',
    };

    var leftscreen = {
      position: 'absolute',
      width: "100%",
      left: 0,
      top: 0
    };

    var tl = {
      position: 'absolute',
      width: topimagewidth,
      height: containerheight,
      left: 0,
      top: logobarheight,
      overflowX: 'hidden',
      overflowY: 'hidden',
    };

    var tr= {
      position: 'absolute',
      width: topimagewidth,
      height: containerheight,
      left: topimagewidth,
      top: logobarheight,
      overflowX: 'hidden',
      overflowY: 'hidden',
    };

    var b= {
      position: 'absolute',
      width: Math.ceil(this.props.width),
      height: containerheight,
      left: 0,
      top: containerheight + logobarheight,
      overflowX: 'hidden',
      overflowY: 'hidden',
    }; 

    var logoheading ={
      fontSize: '500%',
      textTransform: 'uppercase',
    };

    var logobar = {
       background: "#445662",
       height: logobarheight,
       width: '100%',
       color: 'white',
       textAlign: 'center',
       lineHeight: logobarheight + 'px',
       fontSize: '200%',
       textTransform: 'uppercase',

    };

    return  <div>
              <div style={leftscreen}>
                <div style={logobar}>
                  roomcast
                </div>
                <div style={tl} onTouchTap={this._registerScreen}>
                  <img style={smallimagestyle} src="../svgs/register.svg"/>
                  <div style={lhlabelbox}>register</div>
                </div>
                <div style={tr} onTouchTap={this._loginScreen}>
                  <img style={smallimagestyle} src="../svgs/login.svg"/>
                  <div style={rhlabelbox}>login</div>
                </div>
                <div style={b} onTouchTap={this._registerBuildingScreen}>
                  <img style={largeimagestyle} src="../svgs/register_building.svg"/>
                  <div style={blabelbox}>register building</div>
                </div>
              </div>
            </div>;
  },

  _loginScreen: function(){
      console.log("changing to login!!");
      this.props.changeScreen("login");
  },

  _registerScreen: function(){
      console.log("changing to register!!");
      this.props.changeScreen("register");
  },

  _registerBuildingScreen: function(){
      console.log("changing to register building!!");
      this.props.changeScreen("registerbuilding");
  },

});


module.exports = Splash;