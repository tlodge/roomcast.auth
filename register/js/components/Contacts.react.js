var React = require('react');
var RegisterActionCreators = require('../actions/RegisterActionCreators');
var ENTER_KEY_CODE = 13;

var Contacts = React.createClass({

  render: function(){
 

    return (
        <div className="row">
          <div className="large-12 columns unpadded">
            <div className="cell">
              <label>your email 
              	 <div className="row">
                  <div className="small-8 large-8 columns">
                     <TextHandler value={this.props.email} handler={RegisterActionCreators.updateEmail}/>
                  </div>
                </div>
              </label>  
            </div>
            <div className="cell noborder">
              <label>your mobile number
                <div className="row">
                  <div className="small-8 large-8 columns">
                   <TextHandler value={this.props.mobile} handler={RegisterActionCreators.updateMobile}/>
                  </div>
                </div>
              </label>
            </div>
          </div>
        </div>
     );

  }
 
});

var TextHandler = React.createClass({
  
  getInitialState: function(){
    return {text: this.props.value};
  },

  render: function(){
    return <input type="text" value={this.state.text} onBlur={this._onBlur} onKeyDown={this._onKeyDown} onChange={this._onChange}/>;
  },

  _onBlur: function(event){
    var text = this.state.text.trim();
    this.props.handler(text);
  },

  _onChange: function(event, value) {
    var text = event.target.value;
    this.setState({text:text});
  },

  _onKeyDown: function(event) {
    if (event.keyCode === ENTER_KEY_CODE) {
      event.preventDefault();
      var text = this.state.text.trim();
      this.props.hander(text);
    }
  }

});

module.exports = Contacts;