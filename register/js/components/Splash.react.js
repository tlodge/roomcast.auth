var React = require('react');
var $ = require('jquery');
var extend = require('extend');
var ScreenActionCreators = require('../actions/ScreenActionCreators');
var ScreenStore = require('../stores/ScreenStore');
var Login = require("./Login.react");
var Register = require("./Register.react");
var mui = require('material-ui');
var ThemeManager = new mui.Styles.ThemeManager();

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
    
    var lhprops = {
      changeScreen: this._changeScreen,
      height: this.state.height,
      width: this.state.mobile ? this.state.width : this.state.width/2,
      mobile: this.state.mobile,
    };

    //rhs props only evet used if mobile...
    var rhprops = {
       height: this.state.height,
       width: this.state.width / 2,
       left: this.state.width / 2,
    };

    var lhscreen, rhscreen;

    switch (this.state.screen){
        
      case "login":

        lhscreen = <Login {...lhprops} />;
        
        if (!this.state.mobile){
          rhscreen = <About {...rhprops}/>;
        }
        break;

      case "register":
        lhscreen = <Register {...lhprops} />;
        
        if (!this.state.mobile){
           rhscreen = <About {...rhprops}/>;
        }
        break;

      default:
       
        lhscreen = <Options {...lhprops} />;
        
        if (!this.state.mobile){
           rhscreen = <About {...rhprops}/>;
        }
    }
  
    return <div>
              <div>{lhscreen}</div>
              <div>{rhscreen}</div>
          </div>;         
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


var About = React.createClass({
  
  render: function(){
  
    var logoaspect  = 500/180;

    var rightscreen = {
      position: 'absolute',
      width: this.props.width,
      height: "100%",
      left: this.props.left,
      top: 0,
    };

    var roomcast ={
      width: "100%",
      height: "100%",
      background: "#445662",
    };

    var logotextcontainer = {
      color: 'white',
      width: this.props.width,
      height: this.props.height - (this.props.width / logoaspect),
      textAlign: 'center',
      display: 'table-cell',
      verticalAlign: 'middle',
    };

    var logoheading ={
      fontSize: '500%',
      textTransform: 'uppercase',
      paddingLeft: 10,
      paddingRight: 10,
    };

    var logosubheading ={
      fontSize: '150%',
      letterSpacing: '2px',
      paddingLeft: 10,
      paddingRight: 10,
    };

    var logostyle = {
      position: 'absolute',
      bottom: 0,
      width: '100%',
    };

    return(  
      <div style={rightscreen}>
        <div style={roomcast}>
          <div style ={logotextcontainer}>
            <div style={logoheading}>roomcast</div>
            <div style={logosubheading}>built by residents for residents</div>
          </div> 
          <img style={logostyle} src="../svgs/cloudlogo.svg"/>
        </div>
      </div>
    );
  }
});


var Options = React.createClass({

  render: function(){

    var labelboxheight    = 40;
    var containerheight = this.props.height/2;
    var imageheight     = this.props.height/2 ;
    var topimagewidth   = this.props.width/2;

    var leftscreen = {
      position: 'absolute',
      width: this.props.width,
      left: 0,
      top: 0
    };

    var tl = {
      position: 'absolute',
      width:  this.props.width/2,
      height: containerheight,
      left: 0,
      top: 0,
      overflowX: 'hidden',
      overflowY: 'hidden',
    };

    var tr= {
      position: 'absolute',
      width: this.props.width/2,
      height: containerheight,
      left: this.props.width/2,
      top: 0,
      overflowX: 'hidden',
      overflowY: 'hidden',
    };

    var b = {
      position: 'absolute',
      height: containerheight,
      left: 0,
      overflowX: 'hidden',
      overflowY: 'hidden',
      top: containerheight,
      width: this.props.width,
    };

    var smallimagestyle={
      position: 'absolute',
      bottom: 0,
      width: topimagewidth > imageheight ? "100%" : 'auto',
      height: imageheight > topimagewidth ? "100%" : 'auto',
      
    };

    var largeimagestyle = {
      position: 'absolute',
      bottom: 0,
      width: this.props.width/2 > imageheight ? "100%" : 'auto',
      height: imageheight > this.props.width/2 ? "100%" : 'auto',
      
    };

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

    return (
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
    );
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