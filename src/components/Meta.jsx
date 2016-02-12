var React = require('react');

var Header = require('./Header.jsx');
var Video = require('./Video.jsx');
var Audio = require('./Audio.jsx');

var Meta = React.createClass({

  getDefaultProps: function() {
    return {
      meta: {}
    };
  },

  render : function () {
    return (
      <section className="meta container col-md-12">
        <Header name="Meta" />

        <Video video={ this.props.meta.video } />

        <Audio audio={ this.props.meta.audio } />
      </section>
    );
  }

});

module.exports = Meta;