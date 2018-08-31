import React from 'react';
import c3 from 'c3';
import d3 from 'd3';
// import 'c3/c3.css';

const columns = [
  ['Your Monthly Numbers', 1500, 1700, 2000, 2000, 2100, 2200],
  ['Global Average', 1500, 1450, 1520, 1520, 1533, 1528]
];

export default class YearlyChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sitYear: ['Your Yearly Earnings'],
      globYear: ['Global Year'],
      years: ['x']
    };
  }

  componentDidMount() {
    console.log('yearlyglobal', this.props.yearlyGlobalMetrics);
    console.log('yearlySitter', this.props.yearlySitterMetrics);
    var sitterYear = this.state.sitYear
      .slice()
      .concat(Object.values(this.props.yearlySitterMetrics));
    var globalYear = this.state.globYear
      .slice()
      .concat(Object.values(this.props.yearlyGlobalMetrics));
    console.log('yearl:', sitterYear, globalYear);
    var years = this.state.years
      .slice()
      .concat(Object.keys(this.props.yearlyGlobalMetrics));
    this.setState(
      {
        sitYear: sitterYear,
        globYear: globalYear,
        years: years
      },
      () => {
        this.updateChart();
      }
    );
  }

  componentDidUpdate() {
    this.updateChart();
  }

  updateChart() {
    const chart = c3.generate({
      bindto: '#yearlyChart',
      data: {
        x: 'x',
        columns: [this.state.years, this.state.sitYear, this.state.globYear],
        type: this.props.chartType
      }
    });
  }

  render() {
    return <div id="yearlyChart">hi</div>;
  }
}
