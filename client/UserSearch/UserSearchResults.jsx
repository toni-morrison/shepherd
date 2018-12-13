import React from 'react';
import UserSitterRequest from '../UserSitterRequest/UserSitterRequest.jsx';
import { Button, Well, Image, Row, Col } from 'react-bootstrap';
import StarRatings from 'react-star-ratings';
import { renderToStringWithData } from '../../node_modules/react-apollo';

export default class UserSearchResults extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showUserSitterRequest: false,
      currentId: '',
      child_rate: undefined,
      child_addl: undefined,
      pet_rate: undefined,
      pet_addl: undefined,
      home: undefined,
      first_name: '',
      last_name: ''
    };

    this.showUserSitterRequest = this.showUserSitterRequest.bind(this);
    this.hideUserSitterRequest = this.hideUserSitterRequest.bind(this);
  }

  showUserSitterRequest(
    e,
    id,
    first,
    last,
    child,
    childPlus,
    pet,
    petPlus,
    house
  ) {
    this.setState({
      showUserSitterRequest: true,
      currentId: id,
      child_rate: child,
      child_addl: childPlus,
      pet_rate: pet,
      pet_addl: petPlus,
      home: house,
      first_name: first,
      last_name: last
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
                  <Row
                    style={{
                      display: 'flex',
                      justifyContent: 'center'
                    }}
                  >
                    <Col>
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
                        src={review.user.pic_url}
                        style={{ width: '20vh', maxHeight: '20vh' }}
                      />
                    </Col>
                    <Col xs={8} xsOffset={1}>
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
                    <Button
                      onClick={e =>
                        this.showUserSitterRequest(
                          e,
                          review.id,
                          review.user.first_name,
                          review.user.last_name,
                          review.rates.child_rate,
                          review.rates.child_addl,
                          review.rates.pet_rate,
                          review.rates.pet_addl,
                          review.rates.home_rate
                        )
                      }
                    >
                      Request Sitter
                    </Button>
                    <UserSitterRequest
                      show={this.state.showUserSitterRequest}
                      showTrue={this.showUserSitterRequest}
                      showOff={this.hideUserSitterRequest}
                      id={this.state.currentId}
                      child_rate={this.state.child_rate}
                      child_addl={this.state.child_addl}
                      pet_rate={this.state.pet_rate}
                      pet_addl={this.state.pet_addl}
                      home_rate={this.state.home}
                      day={this.props.day}
                      start={this.props.start}
                      end={this.props.end}
                      first_name={this.state.first_name}
                      last_name={this.state.last_name}
                      review={review}
                      lists={this.props.lists}
                      values={this.props.values}
                      startDate={this.props.startDate}
                      endDate={this.props.endDate}
                      user={this.props.user}
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
