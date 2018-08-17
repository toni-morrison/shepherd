import React from 'react';
import c3 from 'c3';
import d3 from 'd3';
import Chart from './Chart.jsx';
// import 'c3/c3.css';

const columns = [
  ['Your Weekly Numbers', 200, 220, 400, 400, 350, 250],
  ['Sitter Average Numbers', 175, 200, 420, 340, 320, 210]
];

export default class SitterMetrics extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chartType: 'bar'
    };
    this.setBarChart = this.setBarChart.bind(this);
    this.setLineChart = this.setLineChart.bind(this);
  }
  setBarChart() {
    console.log('bar fired');
    this.setState({
      chartType: 'bar'
    });
  }
  setLineChart() {
    console.log('line fired');
    this.setState({
      chartType: 'line'
    });
  }

  render() {
    return (
      <div className="app-wrap">
        <Chart columns={columns} chartType={this.state.chartType} />

        <button onClick={this.setBarChart}>bar</button>
        <button onClick={this.setLineChart}>line</button>
      </div>
    );
  }
}
