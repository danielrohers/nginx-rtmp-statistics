'use strict';

var React = require('react');

var Alert = React.createClass({

  render : function () {
    var self = this;
    var clazz = '';
    if (self.props.data) {
      clazz = 'alert alert-danger';
      var timeout = setTimeout(function () {
        self.props.handleError(null);
        clearTimeout(timeout);
      }, 5000);
    }

    return (
      <div className={clazz} role="alert">{self.props.data}</div>
    );
  }

});

module.exports = Alert;