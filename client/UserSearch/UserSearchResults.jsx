import React from 'react';
import UserSitterRequest from '../UserSitterRequest/UserSitterRequest.jsx';
import { Button, Well, Image, Row, Col } from 'react-bootstrap';
import StarRatings from 'react-star-ratings';

export default class UserSearchResults extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showUserSitterRequest: false
    };

    this.showUserSitterRequest = this.showUserSitterRequest.bind(this);
    this.hideUserSitterRequest = this.hideUserSitterRequest.bind(this);
  }

  showUserSitterRequest() {
    this.setState({
      showUserSitterRequest: true
    });
  }

  hideUserSitterRequest() {
    this.setState({
      showUserSitterRequest: false
    });
  }

  render() {
    return (
      <div>
        {this.props.reviews.length !== 0 ? (
          this.props.reviews.map(review => {
            return (
              <div key={review.bio}>
                <Well bsSize="large" style={{ width: '100%' }}>
                  <Row>
                    <Col xs={4}>
                      <StarRatings
                        numberOfStars={5}
                        rating={review.rating || 0}
                        starDimension="30px"
                        starSpacing="2px"
                        starRatedColor="gold"
                        starEmptyColor="grey"
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={3}>
                      <Image src={review.review} />
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={3}>
                      <Image
                        src={'https://i.imgur.com/QT0uEU6.jpg'}
                        responsive
                      />
                    </Col>
                    <Col xs={9}>
                      <Row>
                        <h4>
                          <b>Name:</b>{' '}
                          {review.user.first_name + ' ' + review.user.last_name}
                          <br />
                          <br />
                          <b>Child:</b>{' '}
                          {review.rates.child_rate
                            ? '$' + review.rates.child_rate + '/hour'
                            : 'N/A'}
                          <br />
                          <br />
                          <b>Child Additional:</b>{' '}
                          {review.rates.child_addl
                            ? '$' + review.rates.child_addl + '/hour'
                            : 'N/A'}
                          <br />
                          <br />
                          <b>Pet:</b>{' '}
                          {review.rates.pet_rate
                            ? '$' + review.rates.pet_rate + '/day'
                            : 'N/A'}
                          <br />
                          <br />
                          <b>Pet Additional:</b>{' '}
                          {review.rates.pet_addl
                            ? '$' + review.rates.pet_addl + '/day'
                            : 'N/A'}
                          <br />
                          <br />
                          <b>House:</b>{' '}
                          {review.rates.home_rate
                            ? '$' + review.rates.home_rate + '/day'
                            : 'N/A'}
                          <br />
                          <br />
                          <b>Bio:</b> {review.bio}
                          <br />
                          <br />
                        </h4>
                      </Row>
                    </Col>
                    <Button onClick={this.showUserSitterRequest}>
                      Request Sitter
                    </Button>
                    <UserSitterRequest
                      show={this.state.showUserSitterRequest}
                      showTrue={this.showUserSitterRequest}
                      showOff={this.hideUserSitterRequest}
                      reviews={this.props.reviews}
                      day={this.props.day}
                      start={this.props.start}
                      end={this.props.end}
                    />
                  </Row>
                </Well>
                <br />
              </div>
            );
          })
        ) : (
          <h4>No Sitters Found</h4>
        )}
        <Row>
          <Col xs={3}>
            <Button onClick={this.props.handleSearchClick}>SEARCH AGAIN</Button>
          </Col>
        </Row>
      </div>
    );
  }
}
