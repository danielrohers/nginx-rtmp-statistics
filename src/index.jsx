'use strict';

var React = require('react');

var Nav = require('./components/Nav.jsx');
var Form = require('./components/Form.jsx');
var Rtmp = require('./components/Rtmp.jsx');
var StreamList = require('./components/StreamList.jsx');
var Chart = require('./components/Chart.jsx');

var Application = React.createClass({

  getInitialState : function () {
    return {
      rtmp: {},
      streamList: []
    };
  },

  handleSubmit : function (data) {
    this.setState(data);
  },

  render : function () {
    return (
      <div>
        <Nav />

        <main className="container">

          <div className="col-md-12">
            <Form handleSubmit={ this.handleSubmit } />
          </div>

          <div className="col-md-12">
            <Rtmp rtmp={ this.state.rtmp } />
          </div>

          <Chart id="chart-rtmp-bits" />
          <Chart id="chart-rtmp-bytes" />

          <div className="col-md-12 container">
            <StreamList streamList={ this.state.streamList } />
          </div>
        </main>
      </div>    
    );
  }

});

React.render(
  <Application />,
  document.getElementById('application')
)