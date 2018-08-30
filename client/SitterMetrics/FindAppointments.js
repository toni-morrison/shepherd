import React from 'react';
import { Query } from 'react-apollo';
import {
  FIND_APPOINTMENTS,
  FIND_SITTER_APPOINTMENTS,
  calculateMetrics
} from './MetricsHelper.js';

export default class FindAppointments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      skipped: true
    };
  }
  componentDidMount() {
    if (this.props.user) {
      this.setState({
        skipped: false
      });
    }
  }

  render() {
    return (
      <div>
        <Query query={FIND_APPOINTMENTS} skip={this.state.skipped}>
          {({ loading, error, data }) => {
            if (loading) return <p>loading...</p>;
            if (error) return <p>error....</p>;
            var globalMetrics = calculateMetrics(data.findAppointments);

            return (
              <Query
                query={FIND_SITTER_APPOINTMENTS}
                variables={{ sitterEmail: this.props.user }}
                skip={this.state.skipped}
              >
                {({ loading, error, data }) => {
                  if (loading) return <p>loading...</p>;
                  if (error) return <p>{console.log(error)}</p>;
                  var sitterMetrics = calculateMetrics(
                    data.findSitterAppointments
                  );

                  this.props.getMetrics(globalMetrics, sitterMetrics);

                  return <div> HELLO!</div>;
                }}
              </Query>
            );
          }}
        </Query>
        hello!
      </div>
    );
  }
}
