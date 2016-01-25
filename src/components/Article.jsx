var React = require('react');

var RtmpArticle = React.createClass({

  render : function () {
    return (
      <article className="form-group">
        <label>{ this.props.label }</label>
        <span> { this.props.value }</span>
      </article>
    );
  }

});

module.exports = RtmpArticle;