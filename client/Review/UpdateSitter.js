import React from 'react';
import { Button } from 'react-bootstrap';
import {
  GET_REVIEWS,
  calculateAvg,
  UPDATE_USER_RATING
} from './ReviewHelper.js';
import { Mutation, Query } from 'react-apollo';

export default class UpdateSitter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sitterId: this.props.sitterId,
      renderUpdate: this.props.renderUpdate
    };
    this.stopUpdate = this.stopUpdate.bind(this);
  }

  stopUpdate() {
    this.setState({
      renderUpdate: false
    });
  }

  render() {
    console.log('sitterid in render:', this.props.sitterId);
    return (
      <div>
        <Query query={GET_REVIEWS} variables={{ id: this.props.sitterId }}>
          {({ loading, error, data }) => {
            if (loading) return <p>Review Query Loading...</p>;
            if (error) return <p>Error...</p>;

            var avg = calculateAvg(data.findSitterReviews);
            console.log('avg:', avg);
            return (
              <div>
                {this.state.renderUpdate && (
                  <Mutation mutation={UPDATE_USER_RATING}>
                    {(updateSitter, { loading, error, data }) => {
                      if (loading) return <p>Loading...</p>;
                      if (error) return <p>ERROROROROROR....</p>;
                      updateSitter({
                        variables: {
                          id: this.props.sitterId,
                          rating: avg
                        }
                      }).then(({ data }) => {
                        this.stopUpdate();
                      });

                      return <div />;
                    }}
                  </Mutation>
                )}
              </div>
            );
          }}
        </Query>
      </div>
    );
  }
}
