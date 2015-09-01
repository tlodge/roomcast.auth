var React = require('react');
var WebAPIUtils = require('../utils/WebAPIUtils');
var ScreenActionCreators = require('../actions/ScreenActionCreators');

var Register = React.createClass({

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
    
   
    var loginback = {
      background: "url(../svgs/registerback.svg) no-repeat center bottom",
      height: this.props.height,
      width: this.props.width,
    };

    var loginoverlay = {
      boxSizing: 'border-box',
      position: 'absolute',
      top: toolbarheight,
      background: '#e6e6e6',
      opacity: 0.8,
      width: this.props.width,
      height: this.props.height - (2 * toolbarheight),
      zIndex: 2,
    };

     var logincontent = {
      boxSizing: 'border-box',
      position: 'absolute',
      top: toolbarheight,
      width: this.props.width,
      height: this.props.height - (2 * toolbarheight),
      padding: 10,
      zIndex: 2,
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

    var labelstyle = {
      fontSize: '110%'
    };

    var addmore ={
      color: "rgb(91, 91, 91)"
    };

    /*var constrained ={
      maxHeight: '80px',
      height: '80px',
      width: '100%',
       overflowX: 'auto',
       overflowY: 'hidden',
    };

    var unconstrained ={
      height: '100%',
      width: '2000%',
    };*/

    var constrained ={
      maxHeight: '80',
      width: '100%',
      overflowX: 'auto',
      overflowY: 'hidden',
      whiteSpace: 'nowrap',
    };

    var unconstrained ={
      height: '100%',
      /*width: '2000%',*/
      whiteSpace: 'nowrap',
    };

    var listyle={
      display: 'inline-block'
    };

    return(
      <div>
        <div style={loginback}>
          <div>
            <img  style={imagestyle} src="../svgs/house.svg"/>
            <div style={submitbar}></div>
          </div>
           <div className='clearfix' style={topbar}>
              <a style={maintitle} className='left'>register!</a>
          </div>
         
          <div onTouchTap={this._handleSubmit} style={submitstyle}>
              next
          </div>  
        </div>

        <div style={loginoverlay}></div>
        <div style={logincontent}>

              <form>
                <div className="row">
                  <div className="large-12 columns">
                   <input type="text" placeholder="development code"/>
                  </div>
                </div>
                <div className="row">
                  <div className="large-12 columns">
                    <label style={labelstyle}>Your <strong>block</strong>
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
                    <label style={labelstyle}>Your <strong>apartment</strong> number
                      <div className="row">
                        <div className="large-4 columns">
                          <div className="row collapse">
                            <div className="large-7 columns">
                              <input type="text"/>
                            </div>
                            <div className="large-5 columns">
                              <a className="button tiny postfix">add</a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </label>
                  </div>
                </div>

                <div className="row">
                  <div className="large-12 columns clearfix">
                    <a className="right" style={addmore} href="#">add another</a>
                  </div>
                </div>
              </form>
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

module.exports = Register;
