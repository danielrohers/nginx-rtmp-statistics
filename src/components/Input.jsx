var React = require('react');

var Input = React.createClass({

  render : function () {
    return (
      <div className="form-group">
        <input type={this.props.type || 'text'} className="form-control" value={this.props.value} placeholder={this.props.placeholder} required />
      </div>
    );
  }

});

module.exports = Input;