'use strict';

var React = require('react');
var Input = require('./Input.jsx');
var Rtmp = require('./Rtmp.jsx');
var StreamList = require('./StreamList.jsx');

var Form = React.createClass({

  getInitialState : function () {
    return {
      endpoint: 'http://127.0.0.1/stat',
      time: 1000
    };
  },

  get : function () {
    var that = this;
    $.ajax({
      url: that.state.endpoint,
      cache: false,
      success: function (data) {
        JXON.config({ autoDate: false });
        var jxon = JXON.build(data);
        var rtmp = jxon.rtmp;
        if (!rtmp) {
          return that.stop();
        }

        if (!Array.isArray(rtmp.server.application.live.stream)) {
          rtmp.server.application.live.stream = [rtmp.server.application.live.stream];
        }

        rtmp.server.application.live.stream.forEach(function (stream) {
          if (!Array.isArray(stream.client)) {
            stream.client = [stream.client];
          }
        });

        React.render(
          <Rtmp rtmp={rtmp} />,
          document.getElementById('rtmp')
        )

        React.render(
          <StreamList data={rtmp.server.application.live.stream} />,
          document.getElementById('stream')
        )

        ChartRtmpBits.init('#chart-rtmp-bits', rtmp.uptime, rtmp.bw_in, rtmp.bw_out);
        ChartRtmpBytes.init('#chart-rtmp-bytes', rtmp.uptime, rtmp.bytes_in, rtmp.bytes_out);

        rtmp.server.application.live.stream.forEach(function (stream) {
          var streamName = stream.name;
          var timestamp = stream.time;
          var clients = stream.client;

          ChartStreamBits.init('#chart-stream-bits-' + streamName, timestamp, stream.bw_in, stream.bw_out);
          ChartStreamBytes.init('#chart-stream-bytes-' + streamName, timestamp, stream.bytes_in, stream.bytes_out);

          ChartClientLength.init('#chart-client-length-' + streamName, timestamp, clients.length);
          ChartClientFlashver.init('#chart-client-flashver-' + streamName, timestamp, clients);
        });
      },
      error: function (xhr, status, err) {
        that.stop();
        alert('It could not connect to the server');
      }
    });
  },

  submit : function (e) {
    e.preventDefault();
    var that = this;
    that.get();
    that.interval = setInterval(that.get, that.state.time);
  },

  stop : function () {
    clearInterval(this.interval);
  },

  render : function () {
    return (
      <form onSubmit={this.submit} className="form-inline">
        <Input value={this.state.endpoint} placeholder="server endpoint" />

        <Input type="number" value={this.state.time} placeholder="time reload (ms)" />

        <button type="submit" className="btn btn-primary">start</button>
        <button type="button" className="btn btn-default" onClick={this.stop}>stop</button>
      </form>
    );
  }

});

module.exports = Form;