'use strict';

var React = require('react');

var Nav = require('./components/Nav.jsx');
var Alert = require('./components/Alert.jsx');
var Form = require('./components/Form.jsx');
var Rtmp = require('./components/Rtmp.jsx');
var StreamList = require('./components/StreamList.jsx');
var Chart = require('./components/Chart.jsx');

var Application = React.createClass({

  getInitialState : function () {
    return {
      rtmp: {},
      streamList: [],
      error: null
    };
  },

  handleSubmit : function (data) {
    this.setState(data);
  },

  handleError : function (error) {
    this.setState({ error: error })
  },

  render : function () {
    return (
      <div>
        <Nav />

        <main className="container">

          <Alert data={ this.state.error } handleError={ this.handleError } />

          <div className="col-md-12">
            <Form handleSubmit={ this.handleSubmit } handleError={ this.handleError } />
          </div>

          <div className="col-md-12">
            <Rtmp rtmp={ this.state.rtmp } />
          </div>

          <Chart id="chart-rtmp-bits" />

          <Chart id="chart-stream-bits-in-" />
          <Chart id="chart-stream-bits-out-" />

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