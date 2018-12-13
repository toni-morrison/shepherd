import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { REVIEW_MODAL, checkData } from './ReviewHelper.js';
import { Query } from 'react-apollo';

export default class ReviewModal extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Query query={REVIEW_MODAL} variables={{ email: this.props.user }}>
          {({ loading, error, data }) => {
            if (loading) return <p>loading...</p>;
            if (error)
              return (
                <p>
                  error
                  {console.log(error)}
                </p>
              );

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
