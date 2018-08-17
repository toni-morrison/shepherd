import React from 'react';
import c3 from 'c3';
import d3 from 'd3';
// import 'c3/c3.css';

const columns = [
  ['Your Daily Numbers', 50, 75, 1, 100, 35, 100],
  ['Global Average', 33, 43, 55, 45, 35, 56]
];

export default class DailyChart extends React.Component {
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
      bindto: '#dailyChart',
      data: {
        columns: columns,
        type: this.props.chartType
      }
    });
  }

  render() {
    return <div id="dailyChart">hi</div>;
  }
}
