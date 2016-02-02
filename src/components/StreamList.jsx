var React = require('react');

var Stream = require('./Stream.jsx');

var StreamList = React.createClass({

  render : function () {
    var streamList = this.props.streamList.map(function (stream) {
      return (
        <Stream stream={stream} />
      );
    });
    return (
      <div>{ streamList }</div>
    );
  }

});

module.exports = StreamList;