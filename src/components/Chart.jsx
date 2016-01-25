var React = require('react');

var Chart = React.createClass({

  render : function () {
    return (
      <svg id={ this.props.id }></svg>
    );
  }

});

module.exports = Chart;