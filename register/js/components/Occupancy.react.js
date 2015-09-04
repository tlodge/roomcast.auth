var React = require('react');
var RegisterActionCreators = require('../actions/RegisterActionCreators');

var Occupancy = React.createClass({

  render: function(){
    
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
   
    var occupancies = this.props.occupancies.map(function(occupancy){
      var props = {
        occupancy: occupancy,
        selected: this.props.selectedoccupancy ? occupancy.id === this.props.selectedoccupancy.id : false,
      };
      return <OccupancyItem key={occupancy.id} {...props}/>;
    }.bind(this));

    return (
        <div className="row">
          <div className="large-12 columns unpadded">
            <div className="cell">
              <label>{this.props.apartment.name},{this.props.selectedblock.name}</label>  
              <ul className="button-group">
                 {occupancies}
              </ul>
            </div>
          </div>
        </div>
    );


  }
});

var OccupancyItem = React.createClass({


  render: function(){
     var listyle={
      display: 'inline-block'
    };
    
    var background = {
      background: this.props.selected ? '#d35a51' : '#7bb6a4'
    };
    
    return   <li style={listyle}><div  onTouchTap={this._handleSelect} style={background} className="button tiny">{this.props.occupancy.name}</div></li>;
  },

  _handleSelect: function(){
    console.log("selecting occupancy");
    console.log(this.props.occupancy);

    RegisterActionCreators.selectOccupancy(this.props.occupancy);
  },


});

module.exports = Occupancy;