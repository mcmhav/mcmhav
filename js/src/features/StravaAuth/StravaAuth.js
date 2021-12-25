import React, { Component } from 'react';
import Button from '@material-ui/core/Button';

import './styles.css';

class Dev extends Component {
  constructor() {
    super();
  }

  componentDidMount() {}

  onClick = () => {
    window.location.replace(
      'https://strava-auth-dot-cake-mcmhav.appspot.com/authorize',
    );
  };

  render() {
    return (
      <div id="strava-auth">
        <Button style={{ color: 'chocolate' }} onClick={this.onClick}>
          Strava auth
        </Button>
      </div>
    );
  }
}

export default Dev;
