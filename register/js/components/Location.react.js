var React = require('react');
var RegisterActionCreators = require('../actions/RegisterActionCreators');
                   
var Location = React.createClass({

  render: function(){

    var constrained ={
      maxHeight: '80',
      width: '100%',
      overflowX: 'auto',
      overflowY: 'hidden',
      whiteSpace: 'nowrap',
    };

    var blocks; 

    if (this.props.development.blocks){
        blocks = this.props.development.blocks.map(function(block){
       
        var props = {
                        handleSelect: this._handleSelect,
                        name:block.name,
                        blockId: block.blockId,
                        selected: this.props.selectedblock ? this.props.selectedblock === block.blockId : false,
                    };
        return  <Block key={block.blockId} {...props}/>;
      }.bind(this));
    }

    return (

        <form>
        <div className="row">
          <div className="large-12 columns unpadded">
            <div className="cell">
              <label>your block </label>  
              <ul className="button-group">
                   {blocks}
              </ul>
            </div>
            <div className="cell noborder">
              <label> your apartment number
                <div className="row">
                  <div className="small-4 large-2 columns">
                    <ApartmentSelect />
                  </div>
                  <div className="small-8 large-10 columns">
                     <ApartmentMatches matches={this.props.matches}/>
                  </div>
                </div>
              </label>
            </div>
          </div>
        </div>
      </form>);

  },

  _handleSelect: function(blockId){
    RegisterActionCreators.selectBlock(blockId);
  },
  
});


var ApartmentSelect = React.createClass({
  
  getInitialState: function(){
    return {text:""};
  },

  render: function(){
    return <input type="text" value={this.state.text} onChange={this._onChange}/>;
  },

  _onChange: function(event, value) {
    var text = event.target.value;
    
    this.setState({text:text});

    if (text.trim() !== ""){
       RegisterActionCreators.lookupApartment(text);
    }
  },

});

var ApartmentMatches = React.createClass({

  render: function(){
    
    var nomargins = {
      margin: 0,
    };

    var apartments = this.props.matches.map(function(apartment){
      var props = {
        apartment:apartment
      };
      return <Apartment key={apartment.apartmentId} {...props} />;
    });
    return <ul className="button-group" style={nomargins} >{apartments}</ul>;
  },
});

var Apartment = React.createClass({
  render: function(){
    return <li><a onTouchTap={this._handleSelect} className="button tiny">{this.props.apartment.name}</a></li>;
  },

  _handleSelect: function(){
    console.log(this.props.apartment);
  },
});

var Block = React.createClass({

  render: function(){
    var listyle={
      display: 'inline-block'
    };
    var background = {
      background: this.props.selected ? '#d35a51' : '#7bb6a4'
    };

    return <li onTouchTap={this._handleSelect} style={listyle}><div style={background} className="button tiny">{this.props.name}</div></li>;
  },

  _handleSelect: function(){
    this.props.handleSelect(this.props.blockId);
  }
});
module.exports = Location;