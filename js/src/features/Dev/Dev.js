import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';

class Dev extends Component {
  constructor() {
    super();
  }

  componentDidMount() {}

  onClick = () => {
    this.props.resetApp();
  };

  render() {
    return (
      <div>
        <Button onClick={this.onClick}>Reset</Button>
      </div>
    );
  }
}

Dev.propTypes = {
  resetApp: PropTypes.func,
};

export default Dev;
