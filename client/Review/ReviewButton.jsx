import React from 'react';
import { Button } from 'react-bootstrap';
import { ADD_REVIEW } from './ReviewHelper.js';
import { Mutation } from 'react-apollo';
import UpdateSitter from './UpdateSitter.js';

export default class ReviewButton extends React.Component {
  constructor(props) {
    super(props);
    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.state = {
      sitterId: '',
      renderUpdate: false
    };
  }

  handleButtonClick(updateAppointment) {
    updateAppointment({
      variables: {
        id: this.props.id,
        userRating: this.props.userRating,
        userReview: this.props.userReview,
        sitterRating: this.props.sitterRating,
        sitterReview: this.props.sitterReview
      }
    }).then(({ data }) => {
      let sitterId = data.updateAppointment.sitter.id;

      this.setState(
        {
          sitterId: sitterId
        },
        () => {
          this.setState({ renderUpdate: true });
        }
      );
      this.props.handleSave();
    });
  }

  render() {
    return (
      <div>
        <Mutation mutation={ADD_REVIEW}>
          {(updateAppointment, { loading, error, data }) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error...</p>;

            return (
              <div className="review-button-submit">
                <Button
                  onClick={() => this.handleButtonClick(updateAppointment)}
                  id="review-button-submit"
                >
                  {' '}
                  Save Review
                </Button>
              </div>
            );
          }}
        </Mutation>
        {this.state.renderUpdate && (
          <UpdateSitter
            renderUpdate={this.state.renderUpdate}
            sitterId={this.state.sitterId}
          />
        )}
      </div>
    );
  }
}
