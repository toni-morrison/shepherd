import React from 'react'
import { Button, Grid, Row, Col, Well } from 'react-bootstrap';
import UserProfileUpdate from '../UserProfile/UserProfileUpdate.jsx';
import SitterSetSchedule from './SitterSetSchedule.jsx';
import SitterSetPrices from './SitterSetPrices.jsx';

export default class SitterProfile extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      info: false
    }

    this.handleInfoUpdate = this.handleInfoUpdate.bind(this)
  }

  handleInfoUpdate() {
    this.setState({
      info: !this.state.info
    })

  }

  render () {
    if (this.state.info === false) {
      return(
        <div>
          <Grid>
            <Row>
              <Col xs={12}>
              <center><h3>Personal Information</h3></center>
                <Well bsSize="large" style={{ width:'100%' }}>
                  {/* PULL ALL SITTER INFO FROM USER PROFILE */}
                  {/* PHOTO OF USER */}
                  <h4>Name:</h4><p>Debbie</p><br/>
                  <h4>Email: </h4><p>debbie@sitter.com</p><br/>
                  <h4>Address: </h4><p>369 Lexington Ave, New York, New York</p><br/>
                  <h4>Bio: </h4><p>hi</p>
                  <Button onClick={this.handleInfoUpdate}>Click to Update</Button>
                </Well>
              </Col>
            </Row>

            <SitterSetPrices/>
            <SitterSetSchedule/>
          </Grid>
        </div>
      )
    } else if (this.state.info === true) {
      return (
        <div>
          <UserProfileUpdate handleUpdate={this.handleInfoUpdate}/>
        </div>
      )
    }
  }
}
