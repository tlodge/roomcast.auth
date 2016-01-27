var React = require('react');
var ScreenActionCreators = require('../actions/ScreenActionCreators');
var SubmissionActionCreators = require('../actions/SubmissionActionCreators');
var RegisterScreenStore = require('../stores/RegisterScreenStore');
var RegisterStore = require('../stores/RegisterStore');
var Location = require('./Location.react');
var Code = require('./Code.react');
var User = require('./User.react');
var Occupancy = require('./Occupancy.react');
var Contacts = require('./Contacts.react');
var extend = require('extend');

function getStateFromStores() {
  return {
    screen: RegisterScreenStore.screen(),
    cangoback: RegisterScreenStore.cangoback(),
    canprogress: RegisterScreenStore.canprogress(),
    details: RegisterStore.details(),
    occupancies: RegisterStore.occupancies(),
    readytosubmit: RegisterStore.readytosubmit(),

  };
}

var Register = React.createClass({

  getInitialState: function() {
    return getStateFromStores();
  },

  componentDidMount: function() {
     RegisterStore.addChangeListener(this._onChange);
     RegisterScreenStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    RegisterStore.removeChangeListener(this._onChange);
    DevelopmentStore.removeChangeListener(this._onChange);
  },

  render: function(){


    var content;
    
    var props = extend({  next:this._handleNext, 
                          occupancies:this.state.occupancies,
                          width: this.props.width - 30,
                        }, this.state.details);
    

    switch(this.state.screen){

      case "code":
        content = <Code {...props}/>;
        break;

      case "userdetails":
        content = <User {...props}/>;
        break;
      
      case "location":
        content = <Location {...props}/>;
        break;

      case "occupancy":
        content = <Occupancy {...props}/>;
        break;

      case "contacts":
        content = <Contacts {...props}/>;
        break;

      default:
        //no op
    }
    
    var toolbarheight   = 64;
    var bottombarheight = 54;
    var loginwidth      = 276;
    var titleheight     = 40;
    var textinputheight = 37;
    var textinputmargin = 16;
    var houseaspect     = 200/240;
    var shadowratio     = 100/240;
    var containerheight = Math.max(120, (this.props.height - toolbarheight- bottombarheight)/2);
    var formheight      = (textinputheight * 2) + textinputmargin;
    var housewidth      = (bottombarheight / shadowratio) * houseaspect;

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

    var backstyle = {
      fontSize: "120%",
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
      height: this.props.height - toolbarheight - bottombarheight,
      zIndex: 2,
    };

     var maincontent = {
      boxSizing: 'border-box',
      position: 'absolute',
      top: toolbarheight,
      width: this.props.width,
      height: this.props.height - toolbarheight - bottombarheight,
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
      height: bottombarheight,
      minHeight: bottombarheight,
      color: 'white',
      lineHeight: bottombarheight + 'px',
      fontSize: '150%',
      zIndex: 30,
      opacity: this.state.canprogress ? 1.0 : 0.5,
    };

    var submitbar ={
      position: 'absolute',
      bottom: 0,
      left: housewidth  * 120/200,
      height: bottombarheight,
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
    var next = "next";
    var nextcallback = this._handleNext;

    if (this.state.cangoback){
      back = <a style={backstyle} onTouchTap={this._handleBack} className='float-right'>back</a>
            
    }
    if (this.state.screen === 'contacts' && this.state.readytosubmit){
      next = "done!";
      nextcallback = this._handleSubmit;
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
         
          <div onTouchTap={nextcallback} style={submitstyle}>
              {next}
          </div>  
        </div>

        <div style={overlay}></div>
        <div style={maincontent}>
            {content}
        </div>
      </div>
    );
  },

  _handleSubmit: function(){
    SubmissionActionCreators.register(this.state.details);
  },

  _handleNext: function(){
    if (this.state.canprogress){
     ScreenActionCreators.nextScreen();
    }
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
