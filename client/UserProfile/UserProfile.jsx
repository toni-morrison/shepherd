import React from 'react'
import { Button, Grid, Row, Col, Well } from 'react-bootstrap';
import StarRatings from 'react-star-ratings';
import UserProfileUpdate from './UserProfileUpdate.jsx';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

const GET_USER_INFO = gql`
  query getUserInfo(
    $email: String!
  ) {
    getUserInfo(
      email: $email
    ) {
      email
      first_name
      last_name
      street_address
      city
      state
      zip_code
      rating
    }
  }
`

export default class UserProfile extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      update: false,
      first_name: '',
      last_name: '',
      street_address: '',
      city: '',
      state: '',
      zip_code: '',
      rating: undefined
    }

    this.handleUpdate = this.handleUpdate.bind(this)
  }


  handleUpdate() {
    this.setState({
      update: !this.state.update
    })
  }

  render () {
    if (this.state.update === false) {
      return(
        <Query query={GET_USER_INFO}
        variables={{email: this.props.user}}>
        {({ loading, error, data }) => {
          if (loading) {
            return <p>Loading...</p>;
          }
          if (error) {
            return <p>Error</p>;
          }
          this.setState({
            first_name: data.getUserInfo.first_name,
            last_name: data.getUserInfo.last_name,
            street_address: data.getUserInfo.street_address,
            city: data.getUserInfo.city,
            state: data.getUserInfo.state,
            zip_code: data.getUserInfo.zip_code,
            rating: data.getUserInfo.rating
          })
          return(
          <div>
            <Grid>
              <Row>
                <Col xs={3} xsOffset={4}>
                <center>
                  <strong>Your Rating</strong><br/>
                  <StarRatings
                    numberOfStars={5}
                    rating={this.state.rating} // pull current user rating from DB
                    starDimension="30px"
                    starSpacing="1px"
                    starRatedColor="gold"
                    starEmptyColor="grey"
                  />
                </center>
                </Col>
              </Row>

            <br/>
              <Row>
                <Col xs={12}>
                  <Well bsSize="large" style={{ width:'100%' }}>
                    {/* PHOTO OF USER */}
                    <h4>Name: </h4>{this.state.first_name} {this.state.last_name}<br/>
                    <h4>Email: </h4>{this.state.email}<br/>
                    <h4>Address: </h4>{this.state.street_address} {this.state.city} {this.state.state} {this.state.zip_code}
                    <br/><br/>

                    <Button onClick={this.handleUpdate}>Click to Update</Button>
                  </Well>
                </Col>
              </Row>
          </Grid>
          </div>
          )
        }}
        </Query>
      )
    } else {
      return (
        <div>
          <UserProfileUpdate handleUpdate={this.handleUpdate}/>
        </div>
      )
    }
  }
}