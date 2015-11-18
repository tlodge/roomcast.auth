var React = require('react');
var RegisterActionCreators = require('../actions/RegisterActionCreators');
var TextField = require('./TextField.react');

var User = React.createClass({

  render: function(){
  
    var selectuser;

    if (this.props.canchooseusername){
      selectuser = <div className="cell">
                      <label>choose a username 
                        <div className="row">
                          <div className="small-8 large-8 columns">
                            <TextField value={this.props.username} handler={RegisterActionCreators.updateUsername}/>
                          </div>
                        </div>
                      </label>  
                    </div>
    }

    return (
        <div className="row">
          <div className="large-12 columns unpadded">
            {selectuser}
            <div className="cell">
              <label>your first name 
                 <div className="row">
                  <div className="small-8 large-8 columns">
                     <TextField value={this.props.firstname} handler={RegisterActionCreators.updateFirstname}/>
                  </div>
                </div>
              </label>  
            </div>
            <div className="cell noborder">
              <label>your surname
                <div className="row">
                  <div className="small-8 large-8 columns">
                   	<TextField value={this.props.surname} handler={RegisterActionCreators.updateSurname}/>
                  </div>
                </div>
              </label>
            </div>
          </div>
        </div>
     );
  }
});

module.exports = User;