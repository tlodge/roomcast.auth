var React = require('react');
var $ = require('jquery');

var windowheight =  $(window).height();
var windowwidth  =  $(window).width();

var Splash = React.createClass({
  
  getInitialState: function() {
    return {width:$(window).width(), height:$(window).height()};
  },

  componentDidMount: function() {
    window.addEventListener('resize', this._resize);
  },

  componentWillUnmount: function() {
    window.removeEventListener('resize', this._resize);
  },

  render: function(){
    console.log("rendering..");
    

    var imagestyle={
      width:"100%",
    };

    if (this.state.width/this.state.height <= 1.9){
      imagestyle={
        height:"100%",
      };
    }

    var leftscreen = {
      position: 'absolute',
      width: Math.ceil(this.state.width/2),
      left: 0,
      top: 0
    };

    var rightscreen = {
      position: 'absolute',
      width: Math.ceil(this.state.width/2),
      height: "100%",
      left: Math.floor(this.state.width/2),
      top: 0,

    };

    var tl = {
      position: 'absolute',
      width: Math.ceil(this.state.width/4),
      height: Math.ceil(this.state.height/2),
      left: 0,
      top: 0,
      //background: 'red',
      overflowX: 'hidden',
      overflowY: 'hidden',
    };

    var tr= {
      position: 'absolute',
      width: Math.ceil(this.state.width/4),
      height: Math.ceil(this.state.height/2),
      left: Math.floor(this.state.width/4),
      top: 0,
      // background: 'green',
      overflowX: 'hidden',
      overflowY: 'hidden',
    };

    var b= {
      position: 'absolute',
      width: Math.ceil(this.state.width/2),
      height: Math.ceil(this.state.height/2),
      left: 0,
      top: Math.floor(this.state.height/2),
      // background: 'blue',
      overflowX: 'hidden',
      overflowY: 'hidden',
    };

    var roomcast ={
      width: "100%",
      height: "100%",
      background: "#445662",
     
    };

    var logostyle = {
      position: 'absolute',
      bottom: 0,
      width: '100%',
    };

    var bottomimagestyle={
      width: "100%"
    };

    return  <div>
              <div style={leftscreen}>
                <div style={tl}>
                  <img style={imagestyle} src="../svgs/register.svg"/>
                </div>
                 <div style={tr}>
                  <img style={imagestyle} src="../svgs/login.svg"/>
                </div>
                 <div style={b}>
                  <img style={bottomimagestyle} src="../svgs/register_building.svg"/>
                </div>
                 
              </div>
              <div style={rightscreen}>
                <div style={roomcast}>
                  <img style={logostyle} src="../svgs/cloudlogo.svg"/>
                </div>
              </div>
            </div>

            ;
  },

  _resize: function(){
    this.setState({width:$(window).width(), height:$(window).height()});
  }

});

module.exports = Splash;