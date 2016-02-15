var React = require('react');

var Article = require('./Article.jsx');
var Header = require('./Header.jsx');
var Chart = require('./Chart.jsx');
var Meta = require('./Meta.jsx');

var Stream = React.createClass({

  render : function () {
    if (this.props.stream.time) { this.props.stream.time = Math.floor(this.props.stream.time / 1000); }
    return (
      <div>
        <Header name={'Stream ' + this.props.stream.name } />

        <section className="stream col-md-12">
          <div className="col-md-6">
            <Article label="Time" value={ Format.time(this.props.stream.time) } />

            <Article label="Bandwidth in" value={ this.props.stream.bw_in } />

            <Article label="Bandwidth out" value={ this.props.stream.bw_out } />

            <Article label="Bandwidth Audio" value={ this.props.stream.bw_audio } />
          </div>

          <div className="col-md-6">
            <Article label="N clients" value={ this.props.stream.nclients } />

            <Article label="Bytes in" value={ this.props.stream.bytes_in } />

            <Article label="Bytes out" value={ this.props.stream.bytes_out } />

            <Article label="Bandwidth Video" value={ this.props.stream.bw_video } />
          </div>
        </section>

        <div className="col-md-12 container">
          <Chart id={'chart-stream-bits-in-out-' + this.props.stream.name } />

          <Chart id={'chart-client-length-' + this.props.stream.name } />

          <Chart id={'chart-client-flashver-' + this.props.stream.name } />
        </div>

        <Meta meta={ this.props.stream.meta } />
      </div>
    );
  }

});

module.exports = Stream;