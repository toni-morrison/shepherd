import React from 'react';
import { Button, Grid, Row, Col, FormGroup, FormControl, ControlLabel, Form } from 'react-bootstrap';


export default class UserProfileUpdate extends React.Component {
  constructor (props) {
    super(props)
  }
  
  render () {
    return(
      <div>
        <Grid>
          <Row>
            <Form inline>
              <Col xs={3} >
                <FormGroup controlId="formInlineFirstName">
                  <ControlLabel>First Name</ControlLabel>{' '}
                  <FormControl type="text" />
                </FormGroup>{' '}
              </Col>

              <Col xs={3}>
                <FormGroup controlId="formInlineLastName">
                  <ControlLabel>Last Name</ControlLabel>{' '}
                  <FormControl type="text" />
                </FormGroup>{' '}
              </Col>

              <Col xs={6}>
                <FormGroup controlId="formInlineEmail">
                  <ControlLabel>Email</ControlLabel>{' '}
                  <FormControl type="text"/>
                </FormGroup>{' '}
              </Col>
            </Form>
          </Row>

          <br/>
          
          <Row>
            <Form inline>
              <Col xs={3} >
                <FormGroup controlId="formInlineAddress">
                  <ControlLabel>Address</ControlLabel>{' '}
                  <FormControl type="text" />
                </FormGroup>{' '}
              </Col>

              <Col xs={3}>
                <FormGroup controlId="formInlineCity">
                  <ControlLabel>City</ControlLabel>{' '}
                  <FormControl type="text" />
                </FormGroup>{' '}
              </Col>

              <Col xs={2}>
                <FormGroup controlId="formInlineState">
                  <ControlLabel>State</ControlLabel>{' '}
                  <FormControl type="text" style={{ width:'50%' }}/>
                </FormGroup>{' '}
              </Col>

              <Col xs={2}>
                <FormGroup controlId="formInlineZip">
                  <ControlLabel>Zip Code</ControlLabel>{' '}
                  <FormControl type="text" style={{ width:'50%' }}/>
                </FormGroup>{' '}
              </Col>
            </Form>
          </Row>
          
          <br/>

          <Row inline>
            <Col xs={3}>
              <h5>Upload Photo</h5><input id="image-file" type="file" />
            </Col>
            <Col xs={3}>
              <Button onClick={this.props.handleUpdate} style={{marginTop: '5%'}}>Submit/Update</Button>
            </Col>
          </Row>

        </Grid>
      </div>
    )
  }
}