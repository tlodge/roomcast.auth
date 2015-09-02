var React = require('react');
var ScreenActionCreators = require('../actions/ScreenActionCreators');
var RegisterScreenStore = require('../stores/RegisterScreenStore');
var Location = require('./Location.react');
var Code = require('./Code.react');
var Occupancy = require('./Occupancy.react');
var Contacts = require('./Contacts.react');

function getStateFromStores() {
  return {
    screen: RegisterScreenStore.screen(),
    cangoback: RegisterScreenStore.cangoback(),
  };
}

var Register = React.createClass({

  getInitialState: function() {
    return getStateFromStores();
  },

  componentDidMount: function() {
     RegisterScreenStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    RegisterScreenStore.removeChangeListener(this._onChange);
  },

  render: function(){


    var content;
    console.log("screen is");
    console.log(this.state.screen);

    switch(this.state.screen){
      case "code":
        content = <Code/>;
        break;

      case "location":
        content = <Location/>;
        break;

      case "occupancy":
        content = <Occupancy/>;
        break;

      case "contacts":
        content = <Contacts/>;
        break;

      default:
        //no op
    }
    
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
   
    var background = {
      background: "url(../svgs/registerback.svg) no-repeat center bottom",
      height: this.props.height,
      width: this.props.width,
    };

    var overlay = {
      boxSizing: 'border-box',
      position: 'absolute',
      top: toolbarheight,
      background: '#e6e6e6',
      opacity: 0.8,
      width: this.props.width,
      height: this.props.height - (2 * toolbarheight),
      zIndex: 2,
    };

     var maincontent = {
      boxSizing: 'border-box',
      position: 'absolute',
      top: toolbarheight,
      width: this.props.width,
      height: this.props.height - (2 * toolbarheight),
      zIndex: 31,
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

    var submitbar ={
      position: 'absolute',
      bottom: 0,
      left: housewidth  * 120/200,
      height: toolbarheight,
      width: this.props.width - (housewidth  * 120/200),
      background: "#d35a51",
      color: 'white',
    };

    var imagestyle={
      position:'absolute', 
      bottom:0, 
      width: housewidth, 
      zIndex: 20
    };

    var contentstyle ={
      padding: 7,
    };

    var back;

    if (this.state.cangoback){
      back = <a onTouchTap={this._handleBack} className='right'>back</a>;
    }

    return(
      <div>
        <div style={background}>
          <div>
            <img  style={imagestyle} src="../svgs/house.svg"/>
            <div style={submitbar}></div>
          </div>
           <div className='clearfix' style={topbar}>
              <a style={maintitle} className='left'>register!</a>
              {back}
          </div>
         
          <div onTouchTap={this._handleNext} style={submitstyle}>
              next
          </div>  
        </div>

        <div style={overlay}></div>
        <div style={maincontent}>
            {content}
        </div>
      </div>
    );
  },

  _handleNext: function(){
    ScreenActionCreators.nextScreen();
  },

  _handleBack: function(){
    ScreenActionCreators.previousScreen();
  },
  /**
   * Event handler for 'change' events coming from the stores
   */
  _onChange: function() {
    this.setState(getStateFromStores());
  }
});

module.exports = Register;
