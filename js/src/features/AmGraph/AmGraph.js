import React, { Component } from 'react';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';

class Graph extends Component {
  createSeries = (chart, column) => {
    const seriea = chart.series.push(new am4charts.LineSeries());
    seriea.dataFields.valueY = column;
    seriea.dataFields.categoryX = 'epoch';
    seriea.name = column;
    seriea.strokeWidth = 1;
    seriea.tensionX = 0.7;
    // seriea.bullets.push(new am4charts.CircleBullet());
  };
  componentDidMount() {
    // https://codepen.io/team/amcharts/pen/bMgEbx?editors=0010
    const chart = am4core.create('am-chart', am4charts.XYChart);
    chart.dataSource.url =
      'https://slabbery-beaver-6557.dataplicity.io/tempratures.csv';
    chart.dataSource.parser = new am4core.CSVParser();
    chart.dataSource.parser.options.useColumnNames = true;

    // Create axes
    const categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = 'epoch';

    // Create value axis
    const valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

    // Create series
    this.createSeries(chart, 'temp');
    // this.createSeries('temp');

    // Add legend
    chart.legend = new am4charts.Legend();
  }
  render() {
    return <div style={{ height: 'inherit' }} id="am-chart" />;
  }
}

export default Graph;
