import React, { Component } from 'react';
import ReactSVG from 'react-svg'

import output from '../../assets/output.svg';

import './Landing.css'

const getRandomInt = (max, min = 0) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

class Landing extends Component {

  constructor() {
    super();

    this.state = {
      width: 0,
      height: 0,

      shouldFlicker: true,
    }
    // this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  // componentDidMount() {
  //   console.log('mounted')
  //   this.updateWindowDimensions();
  //   window.addEventListener('resize', this.updateWindowDimensions);
  // }

  // componentWillUnmount() {
  //   console.log('unmounted')
  //   window.removeEventListener('resize', this.updateWindowDimensions);
  // }

  // updateWindowDimensions() {
  //   this.setState({ width: window.innerWidth, height: window.innerHeight });
  // }


  randomRotatSvg = () => {
    this.polies.forEach((poly) => {
      var randomDeg = getRandomInt(4);
      poly.style.transform = 'rotate(' + (randomDeg - 2) + 'deg)'
    })
  }

  onInjected = (svg) => {
    console.log('onInjected');

    const { shouldFlicker } = this.state;
    if (!shouldFlicker) {
      return;
    }
    if (svg) {
      this.polies = svg.querySelectorAll('g polygon');
    }

    this.rotateInterval = setInterval(this.randomRotatSvg, 100)
  }

  onClick = () => {
    console.log('wrapper onClick');
    const { shouldFlicker } = this.state;
    if (shouldFlicker) {
      clearInterval(this.rotateInterval);
      this.setState({ shouldFlicker: false })
    } else {
      this.setState({ shouldFlicker: true })
    }
  }



  onMouseMove = () => {
    console.log('moooove')
    // if (!showingMenu) {
    //   this.setState({ showingMenu: true }, );
    // }
  }

  render() {
    return <div onMouseMove={this.onMouseMove}>
      <ReactSVG
        src={output}
        evalScripts="always"
        onInjected={this.onInjected}
        renumerateIRIElements={false}
        svgClassName="svg-class-name"
        svgStyle={{ width: '100%', height: '100%' }}
        className="svg-wrapper"
        onClick={this.onClick}
      />
    </div>
  }
};

export default Landing;
