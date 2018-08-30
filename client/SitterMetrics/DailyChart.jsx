import React from 'react';
import c3 from 'c3';
import d3 from 'd3';
import { dateArray, weeklyArray } from './MetricsHelper.js';

// import 'c3/c3.css';

export default class DailyChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newColumns: [],
      dateX: []
    };
  }

  componentDidMount() {
    var dateX = ['x'].concat(Object.keys(this.props.dailyGlobalMetrics));
    var pastWeek = dateArray();
    var weekEarn = weeklyArray(this.props.dailySitterMetrics, pastWeek);
    console.log('weekEarn:', weekEarn);

    var newColumns = [
      ['Your Daily Numbers'].concat(
        Object.values(this.props.dailySitterMetrics)
      ),
      ['Global Average'].concat(Object.values(this.props.dailyGlobalMetrics))
    ];
    this.setState(
      {
        newColumns: newColumns,
        dateX: dateX
      },
      () => {
        this.updateChart();
      }
    );
  }

  // componentDidUpdate() {
  //   this.updateChart();
  // }

  updateChart() {
    const chart = c3.generate({
      bindto: '#dailyChart',
      data: {
        // xFormat: '%Y-%m-%d',
        columns: this.state.newColumns,
        type: this.props.chartType
      }
    });
  }

  render() {
    // console.log('dailysitterchart:', this.props.dailySitterMetrics);
    // console.log('dailygloablchart:', this.props.dailyGlobalMetrics);
    // console.log('totalsitter:', this.props.totalSitter);
    // console.log('totalGlobal:', this.props.totalGlobal);
    return <div id="dailyChart">hi</div>;
  }
}
