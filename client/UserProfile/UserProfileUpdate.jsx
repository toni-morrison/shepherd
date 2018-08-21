import React from 'react';
import { Button, Grid, Row, Col, FormGroup, FormControl, ControlLabel, Form } from 'react-bootstrap';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

const UPDATE_USER = gql`
  mutation updateUser(
    $email: String!,
    $first_name: String,
    $last_name: String,
    $street_address: String,
    $city: String,
    $state: String,
    $zip_code: String,
    ) {
      updateUser(
        email: $email,
        first_name: $first_name,
        last_name: $last_name,
        street_address: $street_address,
        city: $city,
        state: $state,
        zip_code: $zip_code 
      ) {
        email
      }
    }
`

export default class UserProfileUpdate extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      first_name: '',
      last_name: '',
      street_address: '',
      city: '',
      state: '',
      zip_code: ''

    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(updateUser) {
    this.props.handleUpdate();
    updateUser({
      variables: {
        email: 'daniel.guan.bca@gmail.com',
        first_name: 'daniel',
        last_name: 'guan',
        street_address: this.state.street_address,
        city: this.state.city,
        state: this.state.state,
        zip_code: this.state.zip_code
      }
    }).then(({ data }) => {
      console.log(data)
    })
  }
  
  render () {
    return(
      <Mutation mutation={UPDATE_USER}>
      {(updateUser, { loading, error, data }) => {
        if (loading) {
          return <p>Loading...</p>;
        }
        if (error) {
          return <p>Error</p>;
        }
        return (
        <div>
          <Grid>
            <Row>
              <Form >
                <Col xs={3} >
                  <FormGroup controlId="formInlineFirstName">
                    <ControlLabel>First Name</ControlLabel>{' '}
                    <FormControl type="text" defaultValue={this.props.first_name}/>
                  </FormGroup>{' '}
                </Col>

                <Col xs={3}>
                  <FormGroup controlId="formInlineLastName">
                    <ControlLabel>Last Name</ControlLabel>{' '}
                    <FormControl type="text" defaultValue={this.props.last_name} />
                  </FormGroup>{' '}
                </Col>
              </Form>
            </Row>
            <br/>
            <Row>
              <Form >
                <Col xs={3} >
                  <FormGroup controlId="formInlineAddress">
                    <ControlLabel>Address</ControlLabel>{' '}
                    <FormControl type="text" defaultValue={this.props.address}/>
                  </FormGroup>{' '}
                </Col>

                <Col xs={3}>
                  <FormGroup controlId="formInlineCity">
                    <ControlLabel>City</ControlLabel>{' '}
                    <FormControl type="text" defaultValue={this.props.city}/>
                  </FormGroup>{' '}
                </Col>

                <Col xs={2}>
                  <FormGroup controlId="formInlineState">
                    <ControlLabel>State</ControlLabel>{' '}
                    <FormControl type="text" style={{ width:'50%' }} defaultValue={this.props.state}/>
                  </FormGroup>{' '}
                </Col>

                <Col xs={2}>
                  <FormGroup controlId="formInlineZip">
                    <ControlLabel>Zip Code</ControlLabel>{' '}
                    <FormControl type="text" style={{ width:'50%' }} defaultValue={this.props.zip}/>
                  </FormGroup>{' '}
                </Col>
              </Form>
            </Row>
            <br/>
            <Row >
              <Col xs={3}>
                <h5>Upload Photo</h5><input id="image-file" type="file" />
              </Col>
            </Row>
            <br/>
            <Row>
              <Col xs={3}>
                  <Button onClick={() => this.handleSubmit(updateUser)} style={{marginTop: '5%'}}>Submit/Update</Button>
              </Col>
            </Row>
          </Grid>
        </div>
        )
      }}
      </Mutation>
    )
  }
}