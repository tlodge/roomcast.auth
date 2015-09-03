var React = require('react');

var Occupancy = React.createClass({

  render: function(){
    
    var listyle={
      display: 'inline-block'
    };

    var greenback ={
      background: '#7bb6a4'
    };

    var apartment ={
      color: "#445662",
      fontSize: "110%",
      textAlign: 'center'
    };

    var block = {
      color: "#445662",
      fontSize: "90%",
      textAlign: 'center'
    };
   
   
    
    return (<form>
        <div className="row">
          <div className="large-12 columns unpadded">
            <div className="cell">
              <label>4534 charthouse</label>  
              <ul className="button-group">
                    <li style={listyle}><div style={greenback} className="button tiny">owner</div></li>
                    <li style={listyle}><div style={greenback} className="button tiny">tenant</div></li>
                    <li style={listyle}><div style={greenback} className="button tiny">own and occupy</div></li>
              </ul>
            </div>
          </div>
        </div>
      </form>);
  }
});

module.exports = Occupancy;