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
  }

  render() {
    return (
      <div>
        <Query query={FIND_APPOINTMENTS}>
          {({ loading, error, data }) => {
            if (loading) return <p>loading...</p>;
            if (error) return <p>error....</p>;
            var globalMetrics = calculateMetrics(data.findAppointments);
            return (
              <Query
                query={FIND_SITTER_APPOINTMENTS}
                variables={{ sitterEmail: this.props.user }}
              >
                {({ loading, error, data }) => {
                  if (loading) return <p>loading...</p>;
                  if (error) return <p>{console.log(error)}</p>;
                  var sitterMetrics = calculateMetrics(
                    data.findSitterAppointments
                  );
                  console.log('sitterMetrics:', sitterMetrics);
                  console.log('globalMetrics:', globalMetrics);

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
