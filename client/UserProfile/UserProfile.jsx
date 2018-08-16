import React from 'react'
import { Button, Grid, Row, Col, Well } from 'react-bootstrap';
import StarRatings from 'react-star-ratings';
import UserProfileUpdate from './UserProfileUpdate.jsx';

export default class UserProfile extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      update: false
    }

    this.handleSubmit = this.handleSubmit.bind(this)
  }
  
handleSubmit() {
  this.setState({
    update: !this.state.update
  })
}

  render () {
    if (this.state.update === false) {
      return(
        <div>
          <Grid>
            <Row>
              <Col xs={3} xsOffset={4}>
              <center>
                <strong>Your Rating</strong><br/>
                <StarRatings
                  numberOfStars={5}
                  rating={4} // pull current user rating from DB
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
                  Name: <br/>
                  Email: <br/>
                  Address: <br/><br/>

                  <Button onClick={this.handleSubmit}>Click to Update</Button>
                </Well>
              </Col>
            </Row>
        </Grid>
        </div>
      )
    } else {
      return (
        <div>
          <UserProfileUpdate handleUpdate={this.handleSubmit}/>
        </div>
      )
    }
  }
}