import React from 'react';
import c3 from 'c3';
import d3 from 'd3';
import YearlyChart from './YearlyChart.jsx';
import DailyChart from './DailyChart.jsx';
import MonthlyChart from './MonthlyChart.jsx';
import { Query } from 'react-apollo';
import {
  FIND_APPOINTMENTS,
  FIND_SITTER_APPOINTMENTS,
  calculateMetrics
} from './MetricsHelper.js';

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
      this.setState({ globalObj: globalObj, sitterObj: sitterObj });
    }
  }

  render() {
    return (
      <Query query={FIND_APPOINTMENTS} pollInterval={5000}>
        {({ loading, error, data }) => {
          if (loading) return <p>loading...</p>;
          if (error) return <p>error....</p>;
          var globalMetrics = calculateMetrics(data.findAppointments);

          return (
            <Query
              query={FIND_SITTER_APPOINTMENTS}
              variables={{ sitterEmail: this.props.user, status: 'Paid' }}
              pollInterval={50}
            >
              {({ loading, error, data }) => {
                if (loading) return <p>loading...</p>;
                if (error) return <p>{console.log(error)}</p>;
                var sitterMetrics = calculateMetrics(
                  data.findSitterAppointments,
                  this.props.user
                );

                return (
                  <div>
                    <div className="app-wrap">
                      <h3>Daily Earnings</h3>
                      <button onClick={this.setBarChart}>bar</button>
                      <button onClick={this.setLineChart}>line</button>
                      {!sitterMetrics ? null : (
                        <DailyChart
                          dailySitterMetrics={sitterMetrics.dailyEarning}
                          dailyGlobalMetrics={globalMetrics.dailyEarning}
                        />
                      )}

                      <br />
                    </div>
                    <div className="app-wrap">
                      <h3>Monthly Earnings</h3>
                      {!sitterMetrics.monthEarning ? null : (
                        <MonthlyChart
                          monthlySitterMetrics={sitterMetrics.monthEarning}
                          monthlyGlobalMetrics={globalMetrics.monthEarning}
                          chartType={this.state.chartType}
                        />
                      )}

                      <br />
                    </div>
                    <div className="app-wrap">
                      <h3>Yearly Earnings</h3>
                      {!sitterMetrics.yearlyEarning ? null : (
                        <YearlyChart
                          yearlySitterMetrics={sitterMetrics.yearlyEarning}
                          yearlyGlobalMetrics={globalMetrics.yearlyEarning}
                          chartType={this.state.chartType}
                        />
                      )}

                      <br />
                    </div>
                  </div>
                );
              }}
            </Query>
          );
        }}
      </Query>
    );
  }
}
