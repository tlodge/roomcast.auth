var React = require('react');
var ENTER_KEY_CODE = 13;

var TextField = React.createClass({
  
  getInitialState: function(){
    return {text: this.props.value};
  },

  render: function(){
    return <input type={this.props.type || "text"} name={this.props.name} errorText={this.props.errorText} value={this.state.text} onBlur={this._onBlur} onKeyDown={this._onKeyDown} onChange={this._onChange}/>;
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
      this.props.handler(text);
    }
  }

});

module.exports = TextField;