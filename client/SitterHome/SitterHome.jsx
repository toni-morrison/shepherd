import React from 'react';
import c3 from 'c3';
import d3 from 'd3';
import FindAppointments from '../SitterMetrics/FindAppointments.js';
import MonthlyTargetDash from './MonthlyTargetDash.jsx';

export default class SitterHome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chartType: 'bar',
      globalObj: {},
      sitterObj: {},
      current: '',
      target: ''
    };
    this.getMetrics = this.getMetrics.bind(this);
    this.getValues = this.getValues.bind(this);
  }

  getValues(target, current) {
    var currentValue = '$' + current + '.00';
    var targetValue = '$' + target + '.00';
    this.setState({
      current: currentValue,
      target: targetValue
    });
  }

  getMetrics(globalObj, sitterObj) {
    if (Object.keys(this.state.globalObj).length === 0) {
      let globalObject = Object.assign({}, globalObj);
      let sitterObject = Object.assign({}, sitterObj);
      this.setState({
        globalObj: globalObject,
        sitterObj: sitterObject
      });
    }
  }
  render() {
    return (
      <div>
        <h1>A Quick Glance</h1>
        <div className="Monthly-wrap">
          <h3> Your Target: {this.state.target} </h3>
          <h3> Current: {this.state.current}</h3>

          {!this.state.sitterObj.monthEarning ? null : (
            <MonthlyTargetDash
              monthlySitterMetrics={this.state.sitterObj.monthEarning}
              getValues={this.getValues}
            />
          )}

          <br />
        </div>
        <FindAppointments getMetrics={this.getMetrics} user={this.props.user} />
      </div>
    );
  }
}
