import React from 'react';
import { Button, Grid, Row, Col, Well, Image } from 'react-bootstrap';
import StarRatings from 'react-star-ratings';
import UserProfileUpdate from './UserProfileUpdate.jsx';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

const GET_USER_INFO = gql`
  query getUserInfo($email: String!) {
    getUserInfo(email: $email) {
      email
      first_name
      last_name
      address
      rating
      pic_url
    }
  }
`;

export default class UserProfile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      update: false
    };

    this.handleUpdate = this.handleUpdate.bind(this);
  }

  handleUpdate() {
    this.setState({
      update: !this.state.update
    });
  }

  render() {
    return (
      <Query
        query={GET_USER_INFO}
        variables={{ email: this.props.user }}
        pollInterval={500}
      >
        {({ loading, error, data }) => {
          if (loading) {
            return <p>Loading...</p>;
          }
          if (error) {
            return <p>Error</p>;
          }
          if (this.state.update === false) {
            return (
              <div>
                <Grid>
                  <Row>
                    <Col xs={3} xsOffset={4}>
                      <center>
                        <strong>Your Rating</strong>
                        <br />
                        <StarRatings
                          numberOfStars={5}
                          rating={data.getUserInfo.rating}
                          starDimension="30px"
                          starSpacing="1px"
                          starRatedColor="gold"
                          starEmptyColor="grey"
                        />{' '}
                      </center>
                    </Col>
                  </Row>
                  <br />
                  <Row>
                    <Col xs={12}>
                      <Well bsSize="large" style={{ width: '100%' }}>
                        <Row>
                          <Col xs={1}>
                            <Image
                              style={{ width: '20vh', maxHeight: '20vh' }}
                              src={
                                data.getUserInfo.pic_url
                              }
                            />
                          </Col>
                          <Col xs={8} xsOffset={1}>
                            <h4>
                              <strong>Name:</strong>{' '}
                              {data.getUserInfo.first_name}{' '}
                              {data.getUserInfo.last_name}
                            </h4>
                          <br/>
                            <h4>
                              <strong>Email:</strong> {data.getUserInfo.email}
                            </h4>
                          <br/>
                            <h4>
                              <strong>Address:</strong>{' '}
                              {data.getUserInfo.address}
                            </h4>
                          </Col>
                        </Row>
                        <br />
                        <br />

                        <Button onClick={this.handleUpdate}>
                          Click to Update
                        </Button>
                      </Well>
                    </Col>
                  </Row>
                </Grid>
              </div>
            );
          } else {
            return (
              <div>
                <Grid>
                  <Row>
                    <Col xs={3} xsOffset={4}>
                      <center>
                        <strong>Your Rating</strong>
                        <br />
                        <StarRatings
                          numberOfStars={5}
                          rating={data.getUserInfo.rating} // pull current user rating from DB
                          starDimension="30px"
                          starSpacing="1px"
                          starRatedColor="gold"
                          starEmptyColor="grey"
                        />
                      </center>
                    </Col>
                  </Row>
                  <br />
                  <Row>
                    <Col xs={12}>
                      <Well bsSize="large" style={{ width: '100%' }}>
                        <UserProfileUpdate
                          handleUpdate={this.handleUpdate}
                          first_name={data.getUserInfo.first_name}
                          last_name={data.getUserInfo.last_name}
                          address={data.getUserInfo.address}
                          user={this.props.user}
                        />
                      </Well>
                    </Col>
                  </Row>
                </Grid>
              </div>
            );
          }
        }}
      </Query>
    );
  }
}
