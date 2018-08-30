import React from 'react';
import c3 from 'c3';
import d3 from 'd3';
import { monthArray } from './MetricsHelper.js';
// import 'c3/c3.css';

const columns = [
  ['Your Weekly Numbers', 200, 220, 400, 400, 350, 250],
  ['Global Average', 175, 200, 420, 340, 320, 210]
];

export default class MonthlyChart extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // console.log('monthlyglobal:', this.props.monthlyGlobalMetrics);
    // console.log('monthlysitter:', this.props.monthlySitterMetrics);
    console.log('monthsitter:', this.props.monthlySitterMetrics);

    var monthArr = monthArray(this.props.monthlySitterMetrics);
    console.log('monthArr:', monthArr);
    this.updateChart();
  }

  componentDidUpdate() {
    this.updateChart();
  }

  updateChart() {
    const chart = c3.generate({
      bindto: '#weeklyChart',
      data: {
        columns: columns,
        type: this.props.chartType
      }
    });
  }

  render() {
    return <div id="weeklyChart">hi</div>;
  }
}
