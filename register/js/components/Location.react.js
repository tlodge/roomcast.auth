var React = require('react');

var Location = React.createClass({

  render: function(){

    var constrained ={
      maxHeight: '80',
      width: '100%',
      overflowX: 'auto',
      overflowY: 'hidden',
      whiteSpace: 'nowrap',
    };

    var listyle={
      display: 'inline-block'
    };

    var greenback ={
      background: '#7bb6a4'
    };

    return (

        <form>
        <div className="row">
          <div className="large-12 columns unpadded">
            <div className="cell">
              <label>your block </label>  
              <ul className="button-group">
                    <li style={listyle}><div style={greenback} className="button tiny">left</div></li>
                    <li style={listyle}><div style={greenback} className="button tiny">right</div></li>
                    <li style={listyle}><div style={greenback} className="button tiny">up</div></li>
                    <li style={listyle}><div style={greenback} className="button tiny">chart house</div></li>
                    <li style={listyle}><div style={greenback} className="button tiny">langbourne</div></li>
              </ul>
            </div>
            <div className="cell noborder">
              <label> your apartment number
                <div className="row">
                  <div className="small-4 large-2 columns">
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

module.exports = Location;