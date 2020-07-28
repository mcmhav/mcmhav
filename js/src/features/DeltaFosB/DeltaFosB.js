import React, { Component } from 'react';
import * as d3 from 'd3';
import PropTypes from 'prop-types';

import './styles.css';

// https://www.researchgate.net/figure/FosB-is-an-unusually-stable-transcription-factor-The-half-life-of-FosB-is-10-h-in-cell_fig1_7092860
// https://www.ncbi.nlm.nih.gov/pmc/articles/PMC1880876/#R7
// https://www.ncbi.nlm.nih.gov/pubmed/9712664
// https://www.ncbi.nlm.nih.gov/pmc/articles/PMC1880876/#R8
// https://www.ncbi.nlm.nih.gov/pmc/articles/PMC1880876/
// https://www.jneurosci.org/content/26/19/5131
// https://en.wikipedia.org/wiki/C-Fos
// https://www.ncbi.nlm.nih.gov/pmc/articles/PMC58680/
// https://upload.wikimedia.org/wikipedia/commons/4/4b/ΔFosB_accumulation.svg

// graph:
// https://bl.ocks.org/interwebjill/8122dd08da9facf8c6ef6676be7da03f

function kernelDensityEstimator(kernel, X) {
  return function(V) {
    return X.map(function(x) {
      return [
        x,
        d3.mean(V, function(v) {
          return kernel(x - v);
        }),
      ];
    });
  };
}
function kernelEpanechnikov(k) {
  return function(v) {
    return Math.abs((v /= k)) <= 1 ? (0.75 * (1 - v * v)) / k : 0;
  };
}

const normal = (mean, variance) => {
  // Precompute portion of the function that does not depend on x
  const predicate = 1 / Math.sqrt(variance * 2 * Math.PI);

  return x => {
    // See the pdf function from http://en.wikipedia.org/wiki/Normal_distribution
    return predicate * Math.exp(-Math.pow(x - mean, 2) / (2 * variance));
  };
};

// Calculate the sample variance of a data series.
const variance = series => {
  const mean = d3.mean(series);

  return (
    d3.sum(
      series.map(element => {
        return Math.pow(element - mean, 2);
      }),
    ) /
    (series.length - 1)
  );
};

const getCFosData = (mean = 3, vari = 1, min = 0, max = 6) => {
  const normalTransform = normal(mean, vari);
  const xSeries = [];
  for (var i = min; i <= max; i++) {
    xSeries.push(i);
  }
  return xSeries.map(normalTransform);
};
const getFosbData = (mean = 6, vari = 3, min = 0, max = 12) => {
  const normalTransform = normal(mean, vari);
  const xSeries = [];
  for (var i = min; i <= max; i++) {
    xSeries.push(i);
  }
  return xSeries.map(normalTransform);
};
const getDFosBIso = max => {
  console.log(max);
  const top = 7;
  // return [0, 0.1, 0.2, 0.19, 0.18, 0.17, 0.16];
  let i = -1;
  const dFosBIso = Array.from(Array(top), (d, id) => (id / top) * max).map(v => {
    i++;
    return {
      x: i,
      value: v,
    };
  });
  for (let index = 2; index < 12; index++) {
    dFosBIso.push({ x: 6 + (index - 1) * 10, value: max / index });
  }
  // dFosBIso.push({ x: 16, value: max / 2 });
  return dFosBIso;
};

const getSources = () => {
  const max = 24;
  let i = -1;

  const cFosData = getCFosData()
    .map(v => {
      i++;
      return {
        x: i,
        value: v,
      };
    })
    .concat(Array.from(Array(24 - 6), (d, id) => ({ x: id + i + 1, value: 0 })));

  //.concat(Array(24 - 6).fill({ value: 0 }));
  console.log(cFosData);

  i = -1;
  const tmpData = getFosbData();
  const fosbData = tmpData
    .map(v => {
      i++;
      return {
        x: i,
        value: v,
      };
    })
    .concat(Array.from(Array(24 - 12), (d, id) => ({ x: id + i + 1, value: 0 })));

  i = -1;
  const dFosBIso = getDFosBIso(Math.max(...tmpData) * 0.2);
  // .concat(Array.from(Array(24 - 5), (d, id) => ({ x: id + i + 1, value: 0 })));

  // dFosBIso.push({ x: 24, value: 0 });

  const sources = [
    {
      id: 'c-Fos',
      values: cFosData,
    },
    {
      id: 'FosB',
      values: fosbData,
    },
    {
      id: 'DFosB-iso',
      values: dFosBIso,
    },
  ];
  console.log(sources);

  return sources;
};

class DeltaFosB extends Component {
  componentDidMount() {
    // this.drawChartBell();
    this.drawSweeter();
  }

  drawChartBell() {
    const h = this.props.height;
    const w = this.props.width;

    const normalTransform = normal(8, 2);
    const xSeries = [];
    const min = 0;
    const max = 24;
    for (var i = min; i <= max; i++) {
      xSeries.push(i);
    }

    // Generate corresponding y values from the x values
    console.log(normalTransform);

    const ySeries = xSeries.map(normalTransform);
    const y2Series = [0, 0, 0, 1, 4, 5, 3, 1];
    const combinedSeries = d3.zip(xSeries, ySeries);

    console.log(ySeries);
    console.log(xSeries);
    console.log(y2Series);

    const color = d3
      .scaleOrdinal()
      .domain(['c-Fos', 'FosB', 'DFosB-iso'])
      .range([
        'rgba(249, 208, 87, 0.7)',
        'rgba(54, 174, 175, 0.65)',
        'rgba(255, 174, 175, 0.65)',
      ]);

    console.log(combinedSeries);

    const svg = d3
      .select('#' + this.props.id)
      .append('svg')
      .attr('width', w)
      .attr('height', h);

    const xScale = d3
      .scaleLinear()
      .domain([min, max])
      .range([0, w]);

    const yScale = d3
      .scaleLinear()
      .domain([d3.min(ySeries), d3.max(ySeries)])
      .range([h, 0]); // Switched because y builds downward

    const area = d3
      .area()
      .curve(d3.curveMonotoneX)
      .x(d => {
        return xScale(d[0]);
      })
      .y0(h)
      .y1(d => {
        return yScale(d[1]);
      });

    svg
      .append('path')
      .datum(combinedSeries)
      .attr('class', 'area')
      .attr('d', area);
  }

  drawSweeter() {
    const { width, height } = this.props;

    const color = d3
      .scaleOrdinal()
      .domain(['c-Fos', 'FosB', 'DFosB-iso'])
      .range([
        'rgba(249, 208, 87, 0.7)',
        'rgba(54, 174, 175, 0.65)',
        'rgba(255, 174, 175, 0.65)',
      ]);

    const x = d3.scaleLinear().range([0, width]);
    const y = d3.scaleLinear().range([height, 0]);
    const z = color;

    const area = d3
      .area()
      .curve(d3.curveMonotoneX)
      .x(d => {
        return x(d.x);
      })
      .y0(y(0))
      .y1(d => {
        return y(d.value);
      });

    const sources = getSources();
    const data = [0, 24];

    x.domain(
      d3.extent(data, d => {
        console.log(d);
        return d;
      }),
    );
    y.domain([
      0,
      d3.max(sources, c => {
        return d3.max(c.values, d => {
          return d.value;
        });
      }),
    ]);
    z.domain(
      sources.map(c => {
        return c.id;
      }),
    );

    const svg = d3
      .select('#' + this.props.id)
      .append('svg')
      .attr('width', '100%')
      .attr('height', height + 20);

    svg
      .append('g')
      .attr('class', 'axis axis--x')
      .attr('transform', 'translate(0,' + height + ')')
      .call(d3.axisBottom(x))
      .attr('fill', '#F00');

    svg
      .append('g')
      .attr('class', 'axis axis--y')
      .call(d3.axisLeft(y));

    var source = svg
      .selectAll('.area')
      .data(sources)
      .enter()
      .append('g')
      .attr('class', d => {
        return `area ${d.id}`;
      });

    source
      .append('path')
      .attr('d', d => {
        console.log(area(d.values));
        return area(d.values);
      })
      .style('fill', d => {
        return z(d.id);
      });
  }

  drawSweetGraph() {}

  drawChart() {
    const h = this.props.height;
    const w = this.props.width;
    const data = [12, 5, 6, 6, 9, 10];

    const svg = d3
      .select('#' + this.props.id)
      .append('svg')
      .attr('width', w)
      .attr('height', h)
      .style('position', 'absolute')
      .style('margin-left', 100);

    svg
      .selectAll('rect')
      .data(data)
      .enter()
      .append('rect')
      .attr('x', (d, i) => i * 70)
      .attr('y', (d, i) => h - 10 * d)
      .attr('width', 65)
      .attr('height', (d, i) => d * 10)
      .attr('fill', 'green');

    var x = d3
      .scaleLinear()
      .domain([-10, 15])
      .range([0, w]);
    var y = d3
      .scaleLinear()
      .range([h, 0])
      .domain([0, 0.12]);
    var kde = kernelDensityEstimator(kernelEpanechnikov(7), x.ticks(60));

    var density1 = kde(
      data.map(function(d) {
        return d;
      }),
    );
    console.log(density1);
    svg
      .append('path')
      .attr('class', 'mypath')
      .datum(density1)
      .attr('fill', '#69b3a2')
      .attr('opacity', '.6')
      .attr('stroke', '#000')
      .attr('stroke-width', 1)
      .attr('stroke-linejoin', 'round')
      .attr(
        'd',
        d3
          .line()
          .curve(d3.curveBasis)
          .x(function(d) {
            return x(d[0]);
          })
          .y(function(d) {
            return y(d[1]);
          }),
      );
  }

  render() {
    return (
      <div id="chart-wrapper">
        <div id={this.props.id} />
      </div>
    );
  }
}

DeltaFosB.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  id: PropTypes.string,
};

DeltaFosB.defaultProps = {
  width: 500,
  height: 550,
  id: 'lol',
};

export default DeltaFosB;
