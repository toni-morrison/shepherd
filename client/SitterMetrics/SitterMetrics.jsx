import React from 'react';
import c3 from 'c3';
import d3 from 'd3';
import YearlyChart from './YearlyChart.jsx';
import DailyChart from './DailyChart.jsx';
import MonthlyChart from './MonthlyChart.jsx';
import MonthlyTarget from './MonthlyTarget.jsx';
import FindAppointments from './FindAppointments.js';
// import 'c3/c3.css';

export default class SitterMetrics extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chartType: 'bar',
      globalObj: {},
      sitterObj: {}
    };
    this.setBarChart = this.setBarChart.bind(this);
    this.setLineChart = this.setLineChart.bind(this);
    this.getMetrics = this.getMetrics.bind(this);
  }
  setBarChart() {
    this.setState({
      chartType: 'bar'
    });
  }
  setLineChart() {
    this.setState({
      chartType: 'line'
    });
  }

  getMetrics(globalObj, sitterObj) {
    if (Object.keys(this.state.globalObj).length === 0) {
      let globalObject = Object.assign({}, globalObj);
      let sitterObject = Object.assign({}, sitterObj);
      this.setState({ globalObj: globalObject, sitterObj: sitterObject });
    }
  }

  render() {
    return (
      <div>
        {/* <div className="Monthly-wrap">
          <h3>Monthly target</h3>

          {!this.state.sitterObj.monthEarning ? null : (
            <MonthlyTarget
              monthlySitterMetrics={this.state.sitterObj.monthEarning}
            />
          )}

          <br />
        </div> */}
        <div className="app-wrap">
          <h3>Daily Earnings</h3>
          <button onClick={this.setBarChart}>bar</button>
          <button onClick={this.setLineChart}>line</button>
          {!this.state.sitterObj.dailyEarning ? null : (
            <DailyChart
              dailySitterMetrics={this.state.sitterObj.dailyEarning}
              dailyGlobalMetrics={this.state.globalObj.dailyEarning}
            />
          )}

          <br />
        </div>
        <div className="app-wrap">
          <h3>Monthly Earnings</h3>
          {!this.state.sitterObj.monthEarning ? null : (
            <MonthlyChart
              monthlySitterMetrics={this.state.sitterObj.monthEarning}
              monthlyGlobalMetrics={this.state.globalObj.monthEarning}
              chartType={this.state.chartType}
            />
          )}

          <br />
        </div>
        <div className="app-wrap">
          <h3>Yearly Earnings</h3>
          {!this.state.sitterObj.yearlyEarning ? null : (
            <YearlyChart
              yearlySitterMetrics={this.state.sitterObj.yearlyEarning}
              yearlyGlobalMetrics={this.state.globalObj.yearlyEarning}
              chartType={this.state.chartType}
            />
          )}

          <br />
        </div>
        <FindAppointments getMetrics={this.getMetrics} user={this.props.user} />
      </div>
    );
  }
}
