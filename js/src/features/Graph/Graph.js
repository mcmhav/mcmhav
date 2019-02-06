import React, { Component } from 'react';
import Plotly from 'plotly.js-dist';

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
        'https://slabbery-beaver-6557.dataplicity.io/tempratures.csv',
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
    try {
      const rows = await this.getCsv();
      const y = Object.keys(rows[0])[0];
      const cols = Object.keys(rows[0]).slice(1);
      const startTime = rows[0][y];
      const endTime = rows[rows.length - 1][y];
      this.setState({
        rows,
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
      Plotly.Plots.resize(document.getElementById('plot'));
    };
  };

  render() {
    this.createPlot();
    return <div id="plot" />;
  }
}

export default Graph;
