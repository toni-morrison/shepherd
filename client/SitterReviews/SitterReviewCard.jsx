import React from 'react';
import { Well, Image, Row, Col } from 'react-bootstrap';

export default class SitterReviewCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div key={this.props.review}>
        <Well bsSize="large" style={{ width: '100%' }}>
          <Row>
            <Col xs={1}>
              <Image
                src={this.props.review.user.pic_url}
                style={{ width: '20vh', maxHeight: '20vh' }}
              />
            </Col>
            <Col xs={8} xsOffset={1}>
              <h4>
                <b>Name:</b>{' '}
                {this.props.review.user.first_name +
                  ' ' +
                  this.props.review.user.last_name}
                <br />
                <br />
                <b>Date:</b> {this.props.day}
                <br />
                <br />
                <b>Review:</b> {this.props.review.userReview}
                <br />
                <br />
                <b>Rating:</b> {this.props.review.userRating}
                <br />
                <br />
                <b>Price:</b> {this.props.review.price}
              </h4>
            </Col>
          </Row>
        </Well>
        <br />
      </div>
    );
  }
}
