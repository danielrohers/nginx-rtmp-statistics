'use strict';

var React = require('react');

var Nav = React.createClass({

  render : function () {
    return (
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <div className="navbar-header">
            <a className="navbar-brand" href="/">Nginx RTMP Statistics</a>
          </div>
        </div>
      </nav>
    );
  }

});

module.exports = Nav;