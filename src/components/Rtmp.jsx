var React = require('react');

var Header = require('./Header.jsx');
var Article = require('./Article.jsx');

var Rtmp = React.createClass({

  getInitialState : function () {
    return {
      endpoint: 'http://stream-1.handson.tv/stat',
      time: 1000
    };
  },

  render : function () {
    return (
      <div>
        <Header name="RTMP" />
        
        <div className="col-md-6">
          <Article label="Nginx version" value={ this.props.rtmp.nginx_version} />
          <Article label="Nginx rtmp version" value={ this.props.rtmp.nginx_rtmp_version} />
          <Article label="Compiler" value={ this.props.rtmp.compiler} />
          <Article label="Built" value={ this.props.rtmp.built} />
          <Article label="Pid" value={ this.props.rtmp.pid} />
          <Article label="Uptime" value={ this.props.rtmp.uptime} />
        </div>

        <div className="col-md-6">
          <Article label="Naccepted" value={ this.props.rtmp.naccepted} />
          <Article label="BW in" value={ this.props.rtmp.bw_in} />
          <Article label="Bytes in" value={ this.props.rtmp.bytes_in} />
          <Article label="BW out" value={ this.props.rtmp.bw_out} />
          <Article label="Bytes out" value={ this.props.rtmp.bytes_out} />
          <Article label="N clients" value={ this.props.rtmp.nclients} />
        </div>
      </div>
    );
  }

});

module.exports = Rtmp;