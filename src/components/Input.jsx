var React = require('react');

var Input = React.createClass({

  render : function () {
    return (
      <div className="form-group">
        <input type={this.props.type || 'text'} name={this.props.name} className="form-control" defaultValue={this.props.value} placeholder={this.props.placeholder} required />
      </div>
    );
  }

});

module.exports = Input;