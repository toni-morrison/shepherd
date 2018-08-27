import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { REVIEW_MODAL, checkData } from './ReviewHelper.js';
import { Query } from 'react-apollo';
import Review from '../Review/Review.jsx';

export default class ReviewModal extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    var email = this.props.user;
    console.log(email);
    return (
      <div>
        <Query query={REVIEW_MODAL} variables={{ email: this.props.user }}>
          {({ loading, error, data }) => {
            if (loading) return <p>loading...</p>;
            if (error) return <p>error...</p>;
            return (
              <div>
                {' '}
                {checkData(data) &&
                  this.props.handleReviewModal(checkData(data))}
              </div>
            );
          }}
        </Query>
      </div>
    );
  }
}
