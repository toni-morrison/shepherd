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
  }

  componentDidMount() {
    this.updateChart();
  }

  componentDidUpdate() {
    this.updateChart();
  }

  updateChart() {
    const chart = c3.generate({
      bindto: '#monthlyChart',
      data: {
        columns: columns,
        type: this.props.chartType
      }
    });
  }

  render() {
    return <div id="monthlyChart">hi</div>;
  }
}
