import React, { Component } from 'react';
import Plotly from 'plotly.js-dist';
import ReactLoading from 'react-loading';

import './styles.css';

const hashCode = str => {
  var hash = 0;
  for (var i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return hash;
};

const intToRGB = i => {
  var c = (i & 0x00ffffff).toString(16).toUpperCase();

  return '00000'.substring(0, 6 - c.length) + c;
};

class Graph extends Component {
  constructor() {
    super();

    this.state = {
      rows: [],
      startTime: null,
      endTime: null,
    };
  }

  getCsv = () => {
    return new Promise((resolve, reject) => {
      Plotly.d3.csv(
        'https://freewheeling-goat-0436.dataplicity.io/tempratures.csv',
        (err, rows) => {
          if (err) {
            reject(err);
          } else {
            resolve(rows);
          }
        },
      );
    });
  };

  async componentDidMount() {
    const { rows } = this.state;

    if (rows || rows.length <= 0) {
      this.squareSizer();
    }

    try {
      const table = await this.getCsv();
      const y = Object.keys(table[0])[0];
      const cols = Object.keys(table[0]).slice(1);
      const startTime = table[0][y];
      const endTime = table[table.length - 1][y];
      this.setState({
        rows: table,
        startTime,
        endTime,
        cols,
        y,
      });
    } catch (error) {
      console.log(error);
    }
  }

  unpack = (rows, key) => {
    return rows.map(row => {
      return row[key];
    });
  };

  createLayout = () => {
    const { startTime, endTime } = this.state;
    const range = [startTime, endTime];
    return {
      // margin: {
      //   t: 20, //top margin
      //   l: 20, //left margin
      //   r: 20, //right margin
      //   b: 20, //bottom margin
      // },
      title: 'Sensors',
      plot_bgcolor: '#1e1e1e',
      // autosize: true,
      paper_bgcolor: '#1e1e1e',
      xaxis: {
        autorange: true,
        // range,
        rangeselector: {
          buttons: [
            {
              count: 1,
              label: '1m',
              step: 'month',
              stepmode: 'backward',
            },
            {
              count: 6,
              label: '6m',
              step: 'month',
              stepmode: 'backward',
            },
            { step: 'all' },
          ],
        },
        rangeslider: { range },
        type: 'date',
      },
      yaxis: {
        autorange: true,
        // range: [86.8700008333, 138.870004167],
        type: 'linear',
      },
    };
  };

  createPlot = () => {
    const { rows, cols, y } = this.state;

    if (!rows.length) {
      return;
    }

    const data = [];

    cols.forEach(col => {
      const trace = {
        type: 'scatter',
        mode: 'lines',
        name: col,
        x: this.unpack(rows, y),
        y: this.unpack(rows, col),
        line: { color: intToRGB(hashCode(col)) },
      };
      data.push(trace);
    });

    Plotly.newPlot('plot', data, this.createLayout(), { showSendToCloud: false });
    window.onresize = function() {
      const plot = document.getElementById('plot');
      if (plot) {
        Plotly.Plots.resize(plot);
      }
    };
  };

  setSquareSize = () => {
    const plot = document.getElementById('plot');
    const containerHeight = plot.offsetHeight;
    const containerWidth = plot.offsetWidth;

    let squareHeight = containerHeight;
    let squareWidth = containerWidth;
    if (containerHeight > containerWidth) {
      squareHeight = containerWidth;
      squareWidth = containerWidth;
    } else {
      squareHeight = containerHeight;
      squareWidth = containerHeight;
    }

    const square = document.querySelector('.square');
    square.style.height = `${squareHeight * 0.7}px`;
    square.style.width = `${squareWidth * 0.7}px`;
  };

  squareSizer = () => {
    this.setSquareSize();
    window.onresize = this.setSquareSize;
  };

  render() {
    const { rows } = this.state;
    this.createPlot();

    return (
      <div key="the-plot" id="plot">
        {rows.length <= 0 && (
          <div className="square">
            <ReactLoading
              className="loader"
              type="cubes"
              color={'red'}
              height={'100%'}
              width={'100%'}
            />
          </div>
        )}
      </div>
    );
  }
}

export default Graph;
