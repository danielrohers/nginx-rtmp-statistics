var React = require('react');

var Header = React.createClass({

  render : function () {
    return (
      <header className="page-header">
        <h3>{  this.props.name  }</h3>
      </header>
    );
  }

});

module.exports = Header;