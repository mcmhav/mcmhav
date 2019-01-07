import React, { Component } from 'react';
import * as posenet from '@tensorflow-models/posenet';

import { bindPage } from './test';

// console.log(posenet.singlePose);
console.log(posenet);

class TFTest extends Component {
  async componentDidMount() {
    bindPage();
  }

  render() {
    return (
      <div className="TFTest">
        asofdijas
        <div id="loading" />
        <div id="info" />
        <div id="main">
          <video
            id="video"
            playsInline
            style={{
              MozTransform: 'scaleX(-1)',
              OTransform: 'scaleX(-1)',
              WebkitTransform: 'scaleX(-1)',
              transform: 'scaleX(-1)',
              display: 'none',
            }}
          />

          <canvas id="output" />
        </div>
      </div>
    );
  }
}

export default TFTest;
