var React = require('react');
var RegisterActionCreators = require('../actions/RegisterActionCreators');

var Occupancy = React.createClass({

  render: function(){
    
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
              <div className="button-group small">
                 {occupancies}
              </div>
            </div>
          </div>
        </div>
    );


  }
});

var OccupancyItem = React.createClass({


  render: function(){
     
    
    var background = {
      background: this.props.selected ? '#d35a51' : '#7bb6a4'
    };
    
    return  <div  onTouchTap={this._handleSelect} style={background} className="button small">{this.props.occupancy.name}</div>;
  },

  _handleSelect: function(){
    RegisterActionCreators.selectOccupancy(this.props.occupancy);
  },


});

module.exports = Occupancy;