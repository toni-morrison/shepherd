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
                  {/* PHOTO OF USER */}
                  <Row>
                    <Col xs={12}>
                      <h4><strong>Name: </strong>Debbie</h4>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={12}>
                      <h4><strong>Email:  </strong>debbie@sitter.com</h4>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={12}>
                      <h4><strong>Address: </strong>369 Lexington Ave, New York, New York</h4>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={12}>
                      <h4><strong>Bio: </strong>hi</h4>
                    </Col>
                  </Row>
                  <br/>
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
