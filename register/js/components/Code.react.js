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

    if (this.props.development.name){
      development = <small className="code">{this.props.development.name}</small>;
    }

    return (<form>
              <div className="row" style={padstyle}>
                <div className="large-12 columns">
                    <input type="text" onChange={this._onChange} value={this.state.text} className="code" placeholder="development code"/>
                    {development}
                </div>
              </div>
            </form>);
  },

  _onChange: function(event, value) {
    this.setState({text: event.target.value});
    if (cc.validate(event.target.value, {parts:2, partLen:4}) !== ""){
      WebAPIUtils.getDevelopment(event.target.value);
    }else{
      console.log("NOT YET VALID!!");
    }
  },

});
module.exports = Code;