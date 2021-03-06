var React = require('react');
var RegisterActionCreators = require('../actions/RegisterActionCreators');
var ENTER_KEY_CODE = 13;
var RegisterStore = require('../stores/RegisterStore');
var extend = require('extend');

function getStateFromStores() {
  return {
    matches: RegisterStore.matches(10)
  };
}

var Location = React.createClass({

  getInitialState: function() {
    return getStateFromStores();
  },

  componentDidMount: function() {
    RegisterStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    RegisterStore.removeChangeListener(this._onChange);
  },


  render: function(){

    var constrained ={
      maxHeight: '80',
      width: '100%',
      overflowX: 'auto',
      overflowY: 'hidden',
      whiteSpace: 'nowrap',
    };

    var blocks; 

    if (this.props.development && this.props.development.blocks){
        blocks = this.props.development.blocks.map(function(block){
       
        var props = {
                        handleSelect: this._handleSelect,
                        block: block,
                        selected: this.props.selectedblock ? this.props.selectedblock.blockId === block.blockId : false,
                    };
        return  <Block key={block.blockId} {...props}/>;
      }.bind(this));
    }

    var props = extend(extend({}, this.props), this.state);

    return (

        
        <div className="row">
          <div className="large-12 columns unpadded">
            <div className="cell">
              <label>your block </label>  
              <div className="button-group small">
                   {blocks}
              </div>
            </div>
            <div className="cell noborder">
              <label> your apartment number
                <div className="row">
                  <div className="small-4 large-2 columns">
                    <ApartmentSelect {...props}/>
                  </div>
                  <div className="small-8 large-10 columns">
                     <ApartmentMatches {...props}/>
                  </div>
                </div>
              </label>
            </div>
          </div>
        </div>
      );

  },

  _handleSelect: function(blockId){
    RegisterActionCreators.selectBlock(blockId);
  },

  _onChange: function() {
    this.setState(getStateFromStores());
  }
  
});


var ApartmentSelect = React.createClass({
  
  getInitialState: function(){
    return {text: ""};
  },

  render: function(){

    var value = this.props.apartment ? this.props.apartment.name : this.state.text;
    return <input type="text" value={value} onBlur={this._onBlur} onFocus={this._onFocus} onKeyDown={this._onKeyDown} onChange={this._onChange}/>;
  },

  _onFocus: function(){
    this.setState({text:""});
    RegisterActionCreators.selectApartmentByName("");
  },

  _onBlur: function(event){
    var text = this.state.text.trim();
    if (text) {
      RegisterActionCreators.selectApartmentByName(text);
    }
  },

  _onChange: function(event, value) {
    
    var text = event.target.value;
    this.props.apartment = null;

    this.setState({text:text});

    if (text.trim() !== ""){
       RegisterActionCreators.lookupApartment(text);
    }
  },

  _onKeyDown: function(event) {
    if (event.keyCode === ENTER_KEY_CODE) {
      event.preventDefault();
      var text = this.state.text.trim();
      if (text) {
        RegisterActionCreators.selectApartmentByName(text);
      }
    }
  }

});

var ApartmentMatches = React.createClass({

  render: function(){
    
    var nomargins = {
      margin: 0,
    };

    var apartments = this.props.matches.map(function(apartment){
      var props = {
        apartment:apartment,
        selected: this.props.apartment ? this.props.apartment.apartmentId === apartment.apartmentId : false,
      };
      return <Apartment key={apartment.apartmentId} {...props} />;
    }.bind(this));
    return <div className="button-group small" style={nomargins} >{apartments}</div>;
  },
});

var Apartment = React.createClass({

 

  render: function(){
    var background = {
      background: this.props.selected ? '#d35a51' : '#7bb6a4'
    };

    return <div onTouchTap={this._handleSelect} className="button" style={background}>{this.props.apartment.name}</div>;
  },

  _handleSelect: function(){
    RegisterActionCreators.selectApartment(this.props.apartment);
  },
});

var Block = React.createClass({

  render: function(){
    
    var background = {
      background: this.props.selected ? '#d35a51' : '#7bb6a4'
    };

    return <div onTouchTap={this._handleSelect} style={background} className="button">{this.props.block.name}</div>;
  },

  _handleSelect: function(){
    this.props.handleSelect(this.props.block);
  }
});
module.exports = Location;