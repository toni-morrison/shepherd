import React from 'react';
import MonthlyTargetDash from './MonthlyTargetDash.jsx';
import { Query } from 'react-apollo';
import {
  FIND_SITTER_APPOINTMENTS,
  calculateMetrics
} from '../SitterMetrics/MetricsHelper.js';

export default class SitterHome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chartType: 'bar',
      current: '',
      target: ''
    };
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

  render() {
    return (
      <Query
        query={FIND_SITTER_APPOINTMENTS}
        variables={{ sitterEmail: this.props.user }}
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
              <h1>A Quick Glance</h1>
              <div className="Monthly-wrap">
                <h3> Your Target: {this.state.target} </h3>
                <h3> Current: {this.state.current}</h3>
                <MonthlyTargetDash
                  monthlySitterMetrics={sitterMetrics.monthEarning}
                  getValues={this.getValues}
                />
              </div>
            </div>
          );
        }}
      </Query>
    );
  }
}
