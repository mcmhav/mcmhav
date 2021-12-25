import React, { Component } from 'react';
import { ReactSVG } from 'react-svg';
import DeltaE from 'delta-e';

import output from '../../assets/output.svg';

import './Landing.css';

function rgb2lab(rgb) {
  var r = rgb[0] / 255,
    g = rgb[1] / 255,
    b = rgb[2] / 255,
    x,
    y,
    z;

  r = r > 0.04045 ? Math.pow((r + 0.055) / 1.055, 2.4) : r / 12.92;
  g = g > 0.04045 ? Math.pow((g + 0.055) / 1.055, 2.4) : g / 12.92;
  b = b > 0.04045 ? Math.pow((b + 0.055) / 1.055, 2.4) : b / 12.92;

  x = (r * 0.4124 + g * 0.3576 + b * 0.1805) / 0.95047;
  y = (r * 0.2126 + g * 0.7152 + b * 0.0722) / 1.0;
  z = (r * 0.0193 + g * 0.1192 + b * 0.9505) / 1.08883;

  x = x > 0.008856 ? Math.pow(x, 1 / 3) : 7.787 * x + 16 / 116;
  y = y > 0.008856 ? Math.pow(y, 1 / 3) : 7.787 * y + 16 / 116;
  z = z > 0.008856 ? Math.pow(z, 1 / 3) : 7.787 * z + 16 / 116;

  return { L: 116 * y - 16, A: 500 * (x - y), B: 200 * (y - z) };
}
function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)]
    : null;
}
function colorDiff(color1, color2) {
  return DeltaE.getDeltaE76(rgb2lab(hexToRgb(color1)), rgb2lab(hexToRgb(color2)));
}

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

  onInjected = (error, svg) => {
    console.log('onInjected');

    if (error) {
      console.error('got an error injecting', error);
    }

    const { shouldFlicker } = this.state;
    if (!shouldFlicker) {
      return;
    }
    if (svg) {
      this.polies = svg.querySelectorAll('g polygon');
      let diffs = 0;
      let maxX = 0;
      let maxY = 0;
      this.polies.forEach(poly => {
        // console.log(poly.attributes.fill.nodeValue);
        // const colors = poly.attributes.fill.nodeValue
        //   .match(colorRegex);
        // const color = {
        //   L: colors[0],
        //   A: colors[1],
        //   b: colors[2],
        // };

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

        const diff = colorDiff(poly.attributes.fill.nodeValue, '#00b9fe');
        if (diff < 70) {
          diffs++;
          this.colorPolies.push(poly);
        }
        // const distance = DeltaE.getDeltaE76();
        // console.log(distance);
      });
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
      // ReactDOM.findDOMNode(this.svgRef.current).getBoundingClientRect().width,
      // ReactDOM.findDOMNode(this.svgRef.current).getBoundingClientRect().height,
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
        afterInjection={this.onInjected}
        renumerateIRIElements={false}
        className="svg-wrapper"
        onClick={this.onClick}
        onMouseMove={this.onMouseMove}
      />
    );
  }
}

export default Landing;
