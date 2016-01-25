var React = require('react');

var Header = require('./Header.jsx');
var Article = require('./Article.jsx');

var Audio = React.createClass({

  render : function () {
    return (
      <article className="col-md-12">
        <Header name="Audio" />

        <div className="col-md-12">
          <div className="col-md-6">
            <Article label="Channels" value={ this.props.audio.channels } />
            <Article label="Codec" value={ this.props.audio.codec } />
          </div>
          
          <div className="col-md-6">
            <Article label="Sample rate" value={ this.props.audio.sample_rate } />
          </div>
        </div>
      </article>
    );
  }

});

module.exports = Audio;