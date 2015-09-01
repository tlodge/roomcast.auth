var React = require('react');
var WebAPIUtils = require('../utils/WebAPIUtils');
var ScreenActionCreators = require('../actions/ScreenActionCreators');
var RegisterScreenStore = require('../stores/RegisterScreenStore');

function getStateFromStores() {
  return {
    screen: RegisterScreenStore.screen(),
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
      padding: 10,
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

    return(
      <div>
        <div style={background}>
          <div>
            <img  style={imagestyle} src="../svgs/house.svg"/>
            <div style={submitbar}></div>
          </div>
           <div className='clearfix' style={topbar}>
              <a style={maintitle} className='left'>register!</a>
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



var Location = React.createClass({

  render: function(){

    var addmore ={
      color: "rgb(91, 91, 91)"
    };

    var constrained ={
      maxHeight: '80',
      width: '100%',
      overflowX: 'auto',
      overflowY: 'hidden',
      whiteSpace: 'nowrap',
    };

    var listyle={
      display: 'inline-block'
    };

    return (

        <form>
        <div className="row">
          <div className="large-12 columns">
           <input type="text" placeholder="development code"/>
          </div>
        </div>
        <div className="row">
          <div className="large-12 columns">
            <label>your block
              <div className="large-12 columns" style={constrained}>
                <ul className="button-group">
                  <li style={listyle}><div className="button tiny">left</div></li>
                  <li style={listyle}><div className="button tiny">right</div></li>
                  <li style={listyle}><div className="button tiny">up</div></li>
                  <li style={listyle}><div className="button tiny">chart house</div></li>
                  <li style={listyle}><div className="button tiny">langbourne</div></li>
                </ul>
              </div>
            </label>
            <label> your apartment number
              <div className="row">
                <div className="small-4 large-2 columns">
                  <input type="text"/>
                </div>
              </div>
            </label>
          </div>
        </div>

        <div className="row">
          <div className="large-12 columns">
            <a style={addmore} href="#">add more</a>
          </div>
        </div>
      </form>);
  }
});


var Occupancy = React.createClass({
  render: function(){
    return <h1> Occupancy </h1>;
  }
});

var Contacts = React.createClass({
  render: function(){
    return <h1> Contacts </h1>;
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

module.exports = Register;
