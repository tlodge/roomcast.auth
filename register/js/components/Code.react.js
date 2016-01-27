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

    var imgstyle={
      width: this.props.width,
      height: 'auto',
    }

    var development;
    var image;

    if (this.props.development && this.props.development.name){
      development = <small onTouchTap={this.props.next} className="code">{this.props.development.name}</small>;
      if (this.props.development.image){
        image =  <div className="row">
                    <div className="columns">
                      <img src={this.props.development.image} style={imgstyle}/>
                    </div>
                  </div>
      }
    }

    return (  
              <div>
                <div className="row" style={padstyle}>
                  <div className="large-12 columns">
                      <input type="text" onChange={this._onChange} value={this.state.text} className="code" placeholder="development code (7C26-PXQG)"/>
                      {development}
                  </div>
                </div>
                {image}
              </div>
            );
  },

  _onChange: function(event, value) {
    var text = event.target.value.trim();
    this.setState({text: text});
    if (text!=="" && cc.validate(text, {parts:2, partLen:4}) !== ""){
      WebAPIUtils.getDevelopment(text);
    }
  },

});
module.exports = Code;