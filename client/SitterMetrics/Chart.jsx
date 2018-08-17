import React from 'react';
import c3 from 'c3';
import d3 from 'd3';
// import 'c3/c3.css';

export default class Chart extends React.Component {
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
      bindto: '#chart',
      data: {
        columns: this.props.columns,
        type: this.props.chartType
      }
    });
  }

  render() {
    return <div id="chart">hi</div>;
  }
}
