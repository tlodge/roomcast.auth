var React = require('react');

var Code = React.createClass({

  render: function(){

    var padstyle = {
      paddingTop: 10
    };

    return (<form>
              <div className="row" style={padstyle}>
                <div className="large-12 columns">
                    <input type="text" className="code" placeholder="development code"/>
                    <small className="code">Langbourne place!</small>
                </div>
              </div>
            </form>);
  }
});
module.exports = Code;