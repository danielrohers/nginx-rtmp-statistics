var React = require('react');

var Header = require('./Header.jsx');
var Article = require('./Article.jsx');

var Video = React.createClass({

  render : function () {
    return (
      <article className="container col-md-12">
        <Header name="Video" />

        <div className="col-md-12">
          <div className="col-md-6">
            <Article label="Width" value={ this.props.video.width } />
            <Article label="Height" value={ this.props.video.height } />
            <Article label="Frame rate" value={ this.props.video.frame_rate } />
            <Article label="Codec" value={ this.props.video.codec } />
          </div>

          <div className="col-md-6">
            <Article label="Profile" value={ this.props.video.profile } />
            <Article label="Compat" value={ this.props.video.compat } />
            <Article label="Level" value={ this.props.video.level } />
          </div>
        </div>
      </article >
    );
  }

});

module.exports = Video;