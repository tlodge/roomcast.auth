var React = require('react');
var RegisterActionCreators = require('../actions/RegisterActionCreators');
var TextField = require('./TextField.react');

var Contacts = React.createClass({

  render: function(){
 

    return (
        <div className="row">
          <div className="large-12 columns unpadded">
            <div className="cell">
              <label>your email 
              	 <div className="row">
                  <div className="small-8 large-8 columns">
                     <TextField value={this.props.email} handler={RegisterActionCreators.updateEmail}/>
                  </div>
                </div>
              </label>  
            </div>
            <div className="cell noborder">
              <label>your mobile number
                <div className="row">
                  <div className="small-8 large-8 columns">
                   	<TextField value={this.props.mobile} handler={RegisterActionCreators.updateMobile}/>
                  </div>
                </div>
              </label>
            </div>
          </div>
        </div>
     );
  }
});

module.exports = Contacts;