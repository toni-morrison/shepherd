import React from 'react';
import c3 from 'c3';
import d3 from 'd3';
import WeeklyChart from './WeeklyChart.jsx';
import DailyChart from './DailyChart.jsx';
import MonthlyChart from './MonthlyChart.jsx';
import MonthlyTarget from './MonthlyTarget.jsx';
import FindAppointments from './FindAppointments.js';
// import 'c3/c3.css';

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
      <div>
        <div className="app-wrap">
          <h3>Daily Earnings</h3>

          <DailyChart chartType={this.state.chartType} />

          <button onClick={this.setBarChart}>bar</button>
          <button onClick={this.setLineChart}>line</button>
          <br />
        </div>
        <div className="app-wrap">
          <h3>Weekly Earnings</h3>
          <WeeklyChart chartType={this.state.chartType} />

          <br />
        </div>
        <div className="app-wrap">
          <h3>Monthly Earnings</h3>
          <MonthlyChart chartType={this.state.chartType} />

          <br />
        </div>
        <FindAppointments user={this.props.user} />
      </div>
    );
  }
}
