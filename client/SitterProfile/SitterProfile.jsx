import React from 'react';
import { Button, Grid, Row, Col, Well, Image } from 'react-bootstrap';
import UserProfileUpdate from '../UserProfile/UserProfileUpdate.jsx';
import SitterViewSchedule from './SitterViewSchedule.jsx';
import SitterPrices from './SitterPrices.jsx';
import SitterBio from './SitterBio.jsx';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

const GET_USER_INFO = gql`
  query getUserInfo($email: String!) {
    getUserInfo(email: $email) {
      email
      first_name
      last_name
      street_address
      city
      state
      zip_code
      rating
      pic_url
    }
  }
`;

export default class SitterProfile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      info: false
    };

    this.handleInfoUpdate = this.handleInfoUpdate.bind(this);
  }

  handleInfoUpdate() {
    this.setState({
      info: !this.state.info
    });
  }

  render() {
    return (
      <Query query={GET_USER_INFO} variables={{ email: this.props.user }}>
        {({ loading, error, data }) => {
          if (loading) {
            return <p>Loading...</p>;
          }
          if (error) {
            return <p>Error</p>;
          }
          if (this.state.info === false) {
            return (
              <div>
                <Grid>
                  <Row>
                    <Col xs={12}>
                      <center>
                        <h3>Personal Information</h3>
                      </center>
                      <Well bsSize="large" style={{ width: '100%' }}>
                        <Row>
                          <Col xs={12}>
                            <Image
                              style={{ width: '20vh', maxHeight: '20vh' }}
                              src={
                                data.getUserInfo.pic_url || this.props.userPic
                              }
                            />
                          </Col>
                        </Row>
                        <Row>
                          <Col xs={12}>
                            <h4>
                              <strong>Name: </strong>
                              {data.getUserInfo.first_name}{' '}
                              {data.getUserInfo.last_name}
                            </h4>
                          </Col>
                        </Row>
                        <Row>
                          <Col xs={12}>
                            <h4>
                              <strong>Email: </strong>
                              {data.getUserInfo.email}
                            </h4>
                          </Col>
                        </Row>
                        <Row>
                          <Col xs={12}>
                            <h4>
                              <strong>Address: </strong>
                              {data.getUserInfo.street_address},{' '}
                              {data.getUserInfo.city}, {data.getUserInfo.state}{' '}
                              {data.getUserInfo.zip_code}
                            </h4>
                          </Col>
                        </Row>
                        <br />
                        <Button onClick={this.handleInfoUpdate}>
                          Click to Update
                        </Button>
                      </Well>
                    </Col>
                  </Row>
                  <SitterBio
                    user={this.props.user}
                    sitterId={this.props.sitterId}
                  />
                  <SitterPrices
                    user={this.props.user}
                    sitterId={this.props.sitterId}
                  />
                  <SitterViewSchedule id={this.props.sitterId} />
                </Grid>
              </div>
            );
          } else if (this.state.info === true) {
            return (
              <div>
                <Grid>
                  <Row>
                    <Col xs={12}>
                      <center>
                        <h3>Personal Information</h3>
                      </center>
                      <Well bsSize="large" style={{ width: '100%' }}>
                        <UserProfileUpdate
                          handleUpdate={this.handleInfoUpdate}
                          first_name={data.getUserInfo.first_name}
                          last_name={data.getUserInfo.last_name}
                          address={data.getUserInfo.street_address}
                          city={data.getUserInfo.city}
                          state={data.getUserInfo.state}
                          zip={data.getUserInfo.zip_code}
                          user={this.props.user}
                        />
                      </Well>
                    </Col>
                  </Row>
                  <SitterBio
                    user={this.props.user}
                    sitterId={this.props.sitterId}
                  />
                  <SitterPrices
                    user={this.props.user}
                    sitterId={this.props.sitterId}
                  />
                  <SitterViewSchedule id={this.props.sitterId} />
                </Grid>
              </div>
            );
          }
        }}
      </Query>
    );
  }
}
