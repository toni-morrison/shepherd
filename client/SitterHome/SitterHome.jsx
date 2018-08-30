import React from 'react';
import c3 from 'c3';
import d3 from 'd3';

import MonthlyTarget from '../SitterMetrics/MonthlyTarget.jsx';

export default class SitterHome extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <h1>A Quick Glance</h1>
        <div className="app-wrap">
          <h3>Monthly Target: $1000</h3>
          {/* <MonthlyTarget /> */}

          <br />
        </div>
      </div>
    );
  }
}
