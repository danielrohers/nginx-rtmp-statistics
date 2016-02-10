'use strict';

var React = require('react');
var Input = require('./Input.jsx');
var Rtmp = require('./Rtmp.jsx');
var StreamList = require('./StreamList.jsx');

var Form = React.createClass({

  getInitialState : function () {
    return {
      endpoint: window.location.origin + '/stat',
      time: 1000
    };
  },

  handleEndpointChange : function (e) {
    this.setState({ endpoint: e.target.value });
  },

  handleTimeChange : function (e) {
    this.setState({ time: e.target.value });
  },

  handleChartChange : function (rtmp, streamList) {
    ChartRtmpBits.init('#chart-rtmp-bits', rtmp.uptime, rtmp.bw_in, rtmp.bw_out);
    ChartRtmpBytes.init('#chart-rtmp-bytes', rtmp.uptime, rtmp.bytes_in, rtmp.bytes_out);

    streamList.forEach(function (stream) {
      var streamName = stream.name;
      var timestamp = stream.time;
      var clients = stream.client;

      ChartStreamBits.init('#chart-stream-bits-' + streamName, timestamp, stream.bw_in, stream.bw_out);
      ChartStreamBytes.init('#chart-stream-bytes-' + streamName, timestamp, stream.bytes_in, stream.bytes_out);

      ChartClientLength.init('#chart-client-length-' + streamName, timestamp, clients.length);
      ChartClientFlashver.init('#chart-client-flashver-' + streamName, timestamp, clients);
    });
  },

  handleSubmit : function (e) {
    e.preventDefault();
    var self = this;

    self.interval = setInterval(function () {
      $.ajax({
        url: self.state.endpoint,
        cache: false,
        success: function (data) {
          JXON.config({ autoDate: false });
          var jxon = JXON.build(data);
          
          var rtmp = jxon.rtmp;
          
          if (!rtmp) {
            self.props.handleError('Error to make XML parser');
            self.stop();
            return;
          }

          var streamList = rtmp.server.application.live.stream;

          if (!streamList) { streamList = []; }

          if (!Array.isArray(streamList)) {
            streamList = [streamList];
          }

          streamList.forEach(function (stream) {
            if (!Array.isArray(stream.client)) {
              stream.client = [stream.client];
            }
          });

          rtmp.nclients = rtmp.server.application.live.nclients;

          self.props.handleSubmit({ rtmp: rtmp, streamList: streamList });
          self.handleChartChange(rtmp, streamList);
        },
        error: function (xhr, status, err) {
          self.stop();
          self.props.handleError('It could not connect to the server.');
        }
      });
    }, self.state.time);
  },

  stop : function () {
    clearInterval(this.interval);
  },

  render : function () {
    return (
      <form onSubmit={this.handleSubmit} className="form-inline">
        <Input value={this.state.endpoint} onChange={this.handleEndpointChange} name="endpoint" placeholder="server endpoint" />

        <Input type="number" value={this.state.time} onChange={this.handleTimeChange} name="time" placeholder="time reload (ms)" />

        <button type="submit" className="btn btn-primary">start</button>
        <button type="button" className="btn btn-default" onClick={this.stop}>stop</button>
      </form>
    );
  }

});

module.exports = Form;