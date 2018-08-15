import React from 'react'
import { Button, Grid, Row, Col, ToggleButtonGroup, ToggleButton, FormGroup, FormControl, ControlLabel, Form } from 'react-bootstrap';

export default class UserProfile extends React.Component {
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
                  <FormControl type="text"/>
                </FormGroup>{' '}
              </Col>

              <Col xs={3}>
                <FormGroup controlId="formInlineLastName">
                  <ControlLabel>Last Name</ControlLabel>{' '}
                  <FormControl type="text" />
                </FormGroup>{' '}
              </Col>

              <Col xs={3}>
                <FormGroup controlId="formInlineEmail">
                  <ControlLabel>Email</ControlLabel>{' '}
                  <FormControl type="text" />
                </FormGroup>{' '}
              </Col>
            </Form>
          </Row>

          
        </Grid>
      </div>
    )
  }
}