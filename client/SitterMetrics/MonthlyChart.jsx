import React from 'react';
import c3 from 'c3';
import d3 from 'd3';
import { monthArray } from './MetricsHelper.js';
// import 'c3/c3.css';

const months = {
  1: 'January',
  2: 'Febuary',
  3: 'March',
  4: 'April',
  5: 'May',
  6: 'June',
  7: 'July',
  8: 'August',
  9: 'September',
  10: 'October',
  11: 'November',
  12: 'December'
};

export default class MonthlyChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      month: '',
      sitterCurrent: 0,
      globalCurrent: 0
    };
  }

  componentDidMount() {
    var sitterMonthArr = monthArray(this.props.monthlySitterMetrics);
    var globalMonthArr = monthArray(this.props.monthlyGlobalMetrics);
    var month = months[sitterMonthArr[0]];
    var sitterCurrent = sitterMonthArr[1];
    var globalCurrent = globalMonthArr[1];

    this.setState({
      month: month,
      sitterCurrent: sitterCurrent,
      globalCurrent: globalCurrent
    });

    this.updateChart();
  }

  componentDidUpdate() {
    this.updateChart();
  }

  updateChart() {
    const chart = c3.generate({
      bindto: '#monthlyChart',
      data: {
        columns: [
          ['Your Month So Far:', this.state.sitterCurrent],
          ['Global Month So far', this.state.globalCurrent]
        ],
        type: this.props.chartType
      },
      axis: {
        x: {
          label: this.state.month
        }
      }
    });
  }

  render() {
    return <div id="monthlyChart">hi</div>;
  }
}
