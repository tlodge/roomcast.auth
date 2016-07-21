var React = require('react');
var ENTER_KEY_CODE = 13;
var cx = require('classnames');

var TextField = React.createClass({
  
  getInitialState: function(){
    return {text: this.props.value};
  },

  getDefaultProps: function(){
    return{
      type: "text",
      handler: function(){},
      enterhandler: function(){},
      name: "",
      errorText:"",
      label:"",
    }
  },

  render: function(){
    var error;
    
    if (this.props.errorText.trim() !== ""){
      error = <small className="error">{this.props.errorText}</small>
    }

    var className = cx({
      error: this.props.errorText.trim() !== ""
    });

    return <div>
              <label>{this.props.label}
                <input className={className} type={this.props.type} name={this.props.name}  value={this.state.text} onBlur={this._onBlur} onKeyDown={this._onKeyDown} onChange={this._onChange}/>
              </label>
              {error}
            </div>
  },

  _onBlur: function(event){
    var text = this.state.text.trim();
    this.props.handler(text);
  },

  _onChange: function(event, value) {
    var text = event.target.value;
    this.setState({text:text});
    this.props.handler(text);
  },

  _onKeyDown: function(event) {
    if (event.keyCode === ENTER_KEY_CODE) {
      event.preventDefault();
      var text = this.state.text.trim();
      this.props.enterhandler(text);
    }
  }

});

module.exports = TextField;
