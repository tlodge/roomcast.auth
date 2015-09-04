var React = require('react');
var WebAPIUtils = require('../utils/WebAPIUtils');
var cc = require('coupon-code');

var Code = React.createClass({

  getInitialState: function() {
    return {text: ''};
  },

  render: function(){

    var padstyle = {
      paddingTop: 10
    };

    var development;

    if (this.props.development && this.props.development.name){
      development = <small onTouchTap={this.props.next} className="code">{this.props.development.name}</small>;
    }

    return (
              <div className="row" style={padstyle}>
                <div className="large-12 columns">
                    <input type="text" onChange={this._onChange} value={this.state.text} className="code" placeholder="development code"/>
                    {development}
                </div>
              </div>
            );
  },

  _onChange: function(event, value) {
    var text = event.target.value.trim();
    this.setState({text: text});
    if (text!=="" && cc.validate(text, {parts:2, partLen:4}) !== ""){
      WebAPIUtils.getDevelopment(text);
    }else{
      console.log("NOT YET VALID!!");
    }
  },

});
module.exports = Code;