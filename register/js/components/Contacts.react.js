var React = require('react');

var Contacts = React.createClass({

  render: function(){
 

    return (

        <form>
        <div className="row">
          <div className="large-12 columns unpadded">
            <div className="cell">
              <label>your email 
              	 <div className="row">
                  <div className="small-8 large-8 columns">
                    <input type="text"/>
                  </div>
                </div>
              </label>  
            </div>
            <div className="cell noborder">
              <label>your mobile number
                <div className="row">
                  <div className="small-8 large-8 columns">
                    <input type="text"/>
                  </div>
                </div>
              </label>
            </div>
          </div>
        </div>
      </form>);

  }
 
});

module.exports = Contacts;