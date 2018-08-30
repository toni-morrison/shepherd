import React from 'react';
import c3 from 'c3';
import d3 from 'd3';
import { dateArray, weeklyArray } from './MetricsHelper.js';

// import 'c3/c3.css';

export default class DailyChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = { columnA: [], columnB: [] };
  }

  componentDidMount() {
    var pastWeek = dateArray();
    var weekSitterEarn = weeklyArray(this.props.dailySitterMetrics, pastWeek);
    var weekGlobalEarn = weeklyArray(this.props.dailyGlobalMetrics, pastWeek);
    var columnA = ['Your Daily Earning'].concat(weekSitterEarn);
    var columnB = ['Global Daily Earning'].concat(weekGlobalEarn);

    this.setState(
      {
        columnA: columnA,
        columnB: columnB
      },
      () => {
        console.log(
          'columna:',
          this.state.columnA,
          'columnb:',
          this.state.columnB
        );
        this.updateChart();
      }
    );
  }

  updateChart() {
    const chart = c3.generate({
      bindto: '#dailyChart',
      data: {
        x: 'x',
        columns: [dateArray(), this.state.columnA, this.state.columnB]
      },
      axis: {
        x: {
          type: 'timeseries',
          tick: {
            format: '%Y-%m-%d'
          }
        }
      }
    });
  }

  render() {
    return <div id="dailyChart">hi</div>;
  }
}
