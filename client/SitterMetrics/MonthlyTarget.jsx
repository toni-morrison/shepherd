import React from 'react';
import c3 from 'c3';
import d3 from 'd3';
// import 'c3/c3.css';

const columns = [
  [
    'Earnings This Month So far',
    50,
    225,
    554,
    655,
    735,
    900,
    955,
    1003,
    1003,
    1003,
    1070,
    1110,
    1220
  ]
];

export default class MonthlyTarget extends React.Component {
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
      bindto: '#monthlyTarget',
      data: {
        columns: columns
      },
      grid: {
        y: {
          lines: [{ value: 1000 }]
        }
      }
    });
  }

  render() {
    return <div id="monthlyTarget">hi</div>;
  }
}
