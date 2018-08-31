import React from 'react';
import c3 from 'c3';
import d3 from 'd3';

import { monthArray } from '../SitterMetrics/MetricsHelper.js';

const months = {
  1: 'January',
  2: 'Febuary',
  3: 'March',
  4: 'April',
  5: 'May',
  6: 'June',
  7: 'July',
  8: 'August',
  9: 'September',
  10: 'October',
  11: 'November',
  12: 'December'
};

export default class MonthlyTargetDash extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      target: '$1000.00',
      current: '',
      percentage: 0,
      currentMonth: ''
    };

    this.updateChart = this.updateChart.bind(this);
  }

  componentDidMount() {
    if (Object.keys(this.props.monthlySitterMetrics).length !== 0) {
      var monthArr = monthArray(this.props.monthlySitterMetrics);
      var target = 1000;
      var percentage = Math.floor((monthArr[1] / target) * 100);
      var current = '$' + String(monthArr[1]) + '.00';
      var month = months[monthArr[0]];

      this.setState(
        {
          target: 1000,
          percentage: percentage,
          current: current,

          currentMonth: month
        },
        () => {
          this.updateChart();
          this.props.getValues(target, monthArr[1]);
        }
      );
    } else {
      this.setState(
        {
          target: 1000,
          percentage: 0,
          current: 0,

          currentMonth: 'August'
        },
        () => {
          this.updateChart();
          this.props.getValues(1000, 0);
        }
      );
    }
  }
  //   var monthArr = monthArray(this.props.monthlySitterMetrics);
  //   var target = 1000;
  //   var percentage = Math.floor((monthArr[1] / target) * 100);
  //   var current = '$' + String(monthArr[1]) + '.00';
  //   var month = months[monthArr[0]];

  //   this.setState(
  //     {
  //       target: 1000,
  //       percentage: percentage,
  //       current: current,

  //       currentMonth: month
  //     },
  //     () => {
  //       this.updateChart();
  //       this.props.getValues(target, monthArr[1]);
  //     }
  //   );
  // }

  // componentDidUpdate() {
  //   this.updateChart();
  // }

  updateChart() {
    var chart = c3.generate({
      bindto: '#monthlyTarget',
      data: {
        columns: [[this.state.currentMonth, this.state.percentage]],
        type: 'gauge',
        onclick: function(d, i) {},
        onmouseover: function(d, i) {},
        onmouseout: function(d, i) {}
      },
      gauge: {
        label: {
          format: function(value, ratio) {
            return value;
          },
          show: true // to turn off the min/max labels.
        },
        min: 0, // 0 is default, //can handle negative min e.g. vacuum / voltage / current flow / rate of change
        max: 100, // 100 is default
        units: '  %',
        width: 65 // for adjusting arc thickness
      },
      color: {
        pattern: ['#FF0000', '#F97600', '#F6C600', '#60B044'], // the three color levels for the percentage values.
        threshold: {
          // unit: 'value', // percentage is default
          // max: 200, // 100 is default
          values: [30, 60, 90, 100]
        }
      },
      size: {
        height: 300
      }
    });
  }

  render() {
    return (
      <div id="monthlyTarget">
        <h3>Your Target: {this.state.target}</h3>
        <h3>You Have Made: {this.state.current}</h3>
        hi
        <div />
      </div>
    );
  }
}

//  updateChart() {
//     const chart = c3.generate({
//       bindto: '#monthlyTarget',
//       data: {
//         columns: [this.state.data1, this.state.data2]
//       },
//       grid: {
//         y: {
//           lines: [{ value: 1000 }]
//         }
//       }
//     });
//   }
