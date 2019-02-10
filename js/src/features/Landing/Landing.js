import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ReactSVG from 'react-svg';
import DeltaE from 'delta-e';
import colorDiff from 'color-difference';

import output from '../../assets/output.svg';

import './Landing.css';

const getRandomInt = (max, min = 0) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
const getRandomColor = () => {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};
const colorRegex = /.{1,2}/g;

class Landing extends Component {
  constructor() {
    super();

    this.state = {
      width: 0,
      height: 0,

      shouldFlicker: true,
    };

    this.svgRef = React.createRef();
    // this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  // componentDidMount() {
  //   console.log('mounted')
  //   this.updateWindowDimensions();
  //   window.addEventListener('resize',this.updateWindowDimensions);
  // }

  // componentWillUnmount() {
  //   console.log('unmounted')
  //   window.removeEventListener('resize',this.updateWindowDimensions);
  // }

  // updateWindowDimensions() {
  //   this.setState({ width: window.innerWidth,height: window.innerHeight });
  // }

  colorPolies = [];

  randomRotatSvg = () => {
    this.polies.forEach(poly => {
      var randomDeg = getRandomInt(4);
      poly.style.transform = 'rotate(' + (randomDeg - 2) + 'deg)';
    });
  };

  randomColorSvg = () => {
    this.colorPolies.forEach(poly => {
      poly.style.fill = getRandomColor();
    });
  };

  loopColorSvg = () => {
    this.colorPolies.forEach(poly => {
      poly.style.fill = getRandomColor();
    });
  };

  onInjected = svg => {
    console.log('onInjected');

    const { shouldFlicker } = this.state;
    if (!shouldFlicker) {
      return;
    }
    if (svg) {
      this.polies = svg.querySelectorAll('g polygon');
      console.log(this.polies);
      let diffs = 0;
      let maxX = 0;
      let maxY = 0;
      this.polies.forEach(poly => {
        // console.log(poly.attributes.fill.nodeValue);
        // const colors = poly.attributes.fill.nodeValue
        //   .replace('#','')
        //   .match(colorRegex);
        // const color = {
        //   L: colors[0],
        //   A: colors[1],
        //   b: colors[2],
        // };
        // const { maxHeight,maxWidth } = p

        poly.attributes.points.nodeValue.split(' ').forEach(point => {
          const xy = point.split(',');
          const x = parseInt(xy[0], 10);
          const y = parseInt(xy[1], 10);
          if (x > maxX) {
            maxX = x;
          }
          if (y > maxY) {
            maxY = y;
          }
        });
        const diff = colorDiff.compare(poly.attributes.fill.nodeValue, '#00b9fe');
        // console.log(diff);
        if (diff < 70) {
          diffs++;
          this.colorPolies.push(poly);
        }
        // const distance = DeltaE.getDeltaE76();
        // console.log(distance);
      });
      console.log(diffs);
      console.log(maxX, maxY);
    }

    this.rotateInterval = setInterval(this.randomRotatSvg, 100);
    this.colorInterval = setInterval(this.randomColorSvg, 500);
  };

  onClick = () => {
    console.log('wrapper onClick');
    const { shouldFlicker } = this.state;
    if (shouldFlicker) {
      clearInterval(this.rotateInterval);
      clearInterval(this.colorInterval);
      this.setState({ shouldFlicker: false });
    } else {
      this.setState({ shouldFlicker: true });
    }
  };

  onMouseMove = event => {
    console.log(
      'moooove',
      event.clientX,
      event.clientY,
      ReactDOM.findDOMNode(this.svgRef.current).getBoundingClientRect().width,
      ReactDOM.findDOMNode(this.svgRef.current).getBoundingClientRect().height,
    );
    // if (!showingMenu) {
    //   this.setState({ showingMenu: true },);
    // }
  };

  render() {
    return (
      <ReactSVG
        ref={this.svgRef}
        src={output}
        evalScripts="always"
        onInjected={this.onInjected}
        renumerateIRIElements={false}
        svgClassName="svg-class-name"
        svgStyle={{ width: '99%', height: '99%' }}
        className="svg-wrapper"
        onClick={this.onClick}
        onMouseMove={this.onMouseMove}
      />
    );
  }
}

export default Landing;
