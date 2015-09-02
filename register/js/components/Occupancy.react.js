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
   
    return (

        <form>
         <div className="row">
            <div className="large-12 columns unpadded">
              <div className="cell">
                <div className="row">
                  <div className="small-4 large-4 columns">
                    <div style={apartment}>459</div>
                    <div style={block}> block 35 </div>
                  </div>
                  <div className="small-8 large-8 columns">
                       <ul className="button-group">
                          <li style={listyle}><div style={greenback} className="button tiny">owner</div></li>
                          <li style={listyle}><div style={greenback} className="button tiny">tenant</div></li>
                          <li style={listyle}><div style={greenback} className="button tiny">own and occupy</div></li>
                      </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
      </form>);
  }
});

module.exports = Occupancy;